"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3 = require("./vec3");
var Color = require("./color");
var Ray = require("./ray");
var HITTABLE_LIST = require("./hittable_list");
var HITTABLE = require("./hittable");
var Ohters = require("./others");
var sphere_1 = require("./sphere");
var camera_1 = require("./camera");
var Material = require("./material");
function test(rec) {
    rec.normal = new Vector3.vec3([0, 1, 1]);
}
function ray_color(r, world, depth) {
    if (depth <= 0.0) {
        return new Vector3.vec3([0, 0, 0]);
    }
    var rec = new HITTABLE.hit_record();
    if (world.hit(r, 0.0001, Ohters.Infinity, rec)) {
        var scattered = new Ray.ray();
        var attenuation = new Vector3.vec3();
        if (rec.mat_ptr.scatter(r, rec, attenuation, scattered)) {
            return Vector3.mul(attenuation, ray_color(scattered, world, depth - 1));
        }
        return new Vector3.vec3();
    }
    var unit_direction = Vector3.unit_vector(r.direction);
    var t = 0.5 * (unit_direction.y + 1.0);
    return new Vector3.vec3([1.0, 1.0, 1.0]).mul(1.0 - t).add(new Vector3.vec3([0.5, 0.7, 1.0]).mul(t));
}
function ray_color3(r, world, depth) {
    return new Promise(function (resolve) {
        //console.log('ckpt1');
        if (depth <= 0.0) {
            //console.log('ckpt2');
            return resolve(new Vector3.vec3([0, 0, 0]));
        }
        var rec = new HITTABLE.hit_record();
        if (world.hit(r, 0.0001, Ohters.Infinity, rec)) {
            //console.log('ckpt3');
            var scattered = new Ray.ray();
            var attenuation = new Vector3.vec3();
            if (rec.mat_ptr.scatter(r, rec, attenuation, scattered)) {
                //console.log('ckpt4');
                return resolve(Vector3.mul(attenuation, ray_color(scattered, world, depth - 1)));
            }
            return resolve(new Vector3.vec3());
        }
        //console.log('ckpt5');
        var unit_direction = Vector3.unit_vector(r.direction);
        var t = 0.5 * (unit_direction.y + 1.0);
        return resolve(new Vector3.vec3([1.0, 1.0, 1.0]).mul(1.0 - t).add(new Vector3.vec3([0.5, 0.7, 1.0]).mul(t)));
    });
}
function ray_color2(r) {
    var t = hit_sphere(new Vector3.vec3([0, 0, -1]), 0.5, r);
    if (t > 0.0) {
        var N = Vector3.unit_vector(Vector3.minus(r.at(t), new Vector3.vec3([0, 0, -1])));
        return Vector3.mul(new Vector3.vec3([N.x + 1, N.y + 1, N.z + 1]), 0.5);
    }
    var unit_direction = Vector3.unit_vector(r.direction);
    t = 0.5 * (unit_direction.y + 1.0);
    return new Vector3.vec3([1.0, 1.0, 1.0]).mul(1.0 - t).add(new Vector3.vec3([0.5, 0.7, 1.0]).mul(t));
}
function random_scene(world, sample_num) {
    if (sample_num === void 0) { sample_num = 11; }
    var ground_material = new Material.lambertian(new Vector3.vec3([0.5, 0.5, 0.5]));
    world.add(new sphere_1.Sphere(new Vector3.vec3([0, -1000, 0]), 1000, ground_material));
    for (var a = -sample_num; a < sample_num; a++) {
        for (var b = -sample_num; b < sample_num; b++) {
            var choose_mat = Ohters.random_double();
            var center = new Vector3.vec3([a + 0.9 * Ohters.random_double(), 0.2, b + 0.9 * Ohters.random_double()]);
            if (Vector3.minus(center, new Vector3.vec3([4, 0.2, 0])).length() > 0.9) {
                if (choose_mat < 0.8) {
                    // diffuse
                    var albedo = Vector3.mul(Vector3.random(), Vector3.random());
                    var sphere_material = new Material.lambertian(albedo);
                    world.add(new sphere_1.Sphere(center, 0.2, sphere_material));
                }
                else if (choose_mat < 0.95) {
                    // metal
                    var albedo = Vector3.random(0.5, 1);
                    var fuzz = Ohters.random_double(0, 0.5);
                    var sphere_material = new Material.metal(albedo, fuzz);
                    world.add(new sphere_1.Sphere(center, 0.2, sphere_material));
                }
                else {
                    // glass
                    var sphere_material = new Material.dielectric(1.5);
                    world.add(new sphere_1.Sphere(center, 0.2, sphere_material));
                }
            }
        }
    }
    var material1 = new Material.dielectric(1.5);
    world.add(new sphere_1.Sphere(new Vector3.vec3([0, 1, 0]), 1.0, material1));
    var material2 = new Material.lambertian(new Vector3.vec3([0.4, 0.2, 0.1]));
    world.add(new sphere_1.Sphere(new Vector3.vec3([-4, 1, 0]), 1.0, material2));
    var material3 = new Material.metal(new Vector3.vec3([0.7, 0.6, 0.5]), 0.0);
    world.add(new sphere_1.Sphere(new Vector3.vec3([4, 1, 0]), 1.0, material3));
}
function hit_sphere(center, radius, r) {
    var oc = Vector3.minus(r.origin, center);
    var a = r.direction.length_squared();
    var half_b = Vector3.dot(oc, r.direction);
    var c = oc.length_squared() - radius * radius;
    var discriminant = half_b * half_b - a * c;
    if (discriminant < 0)
        return -1.0;
    else {
        return (-half_b - Math.sqrt(discriminant)) / a;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('MainCanvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var sum = width * height;
    if (ctx == null || typeof ctx == undefined) {
        window.close();
    }
    var imageData = ctx.createImageData(width, height);
    var aspect_ratio = width / height;
    var image_width = width;
    var image_height = height;
    var progressBar = document.getElementById('Progress');
    var sample_per_pixel = 100;
    var max_dpeth = 50;
    var lookfrom = new Vector3.vec3([13, 2, 3]);
    var lookat = new Vector3.vec3([0, 0, 0]);
    var vup = new Vector3.vec3([0, 1, 0]);
    var dist_to_focus = 10.0;
    var aperture = 0.1;
    var sample_num = 0;
    console.log("YEYYYSYSYSYSYS");
    function main() {
        // 创建一个新的ImageData对象
        progressBar.value = 0;
        progressBar.textContent = progressBar.value.toString() + '%';
        var prograss = 0;
        function get_color(x, y, cam, world) {
            var pixel_color = new Vector3.vec3([0, 0, 0]);
            for (var s = 0; s < sample_per_pixel; s += 1) {
                var u = (x + Ohters.random_double()) / (image_width - 1);
                var v = (y + Ohters.random_double()) / (image_height - 1);
                //let r = new Ray.ray(origin, Vector3.add(lower_left_corner,  Vector3.mul(horizontal, u)).add(Vector3.mul(vertical, v)).minus(origin));
                var r = cam.get_ray(u, v);
                pixel_color.add(ray_color(r, world, max_dpeth));
            }
            // console.log(x, y, pixel_color);
            Color.write_color(imageData, x, height - y - 1, width, height, pixel_color, sample_per_pixel);
            ctx.putImageData(imageData, 0, 0);
            prograss += 1;
        }
        if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // world
            var world_1 = new HITTABLE_LIST.hittable_list();
            random_scene(world_1, sample_num);
            // Camera
            var cam_1 = new camera_1.camera(lookfrom, lookat, vup, 20, aspect_ratio, aperture, dist_to_focus);
            var _loop_1 = function (y) {
                var _loop_2 = function (x) {
                    setTimeout(function () { return get_color(x, y, cam_1, world_1); }, (x + (height - y - 1) * width) * 0.1);
                    setTimeout(function () {
                        progressBar.value = (prograss / sum) * 100;
                        // console.log('Interval : ', prograss / sum);
                        progressBar.textContent = progressBar.value.toFixed(3).toString() + '%';
                    }, (x + (height - y - 1) * width) * 0.1);
                };
                for (var x = 0; x < width; x += 1) {
                    _loop_2(x);
                }
            };
            // 设置每个像素的颜色
            // const interval = setInterval(()=>{
            //     progressBar.value = (prograss / sum) * 100;
            //     console.log('Interval : ', prograss / sum);
            //     progressBar.textContent = progressBar.value.toString() + '%';
            // }, 0.01);
            for (var y = height - 1; y >= 0; y -= 1) {
                _loop_1(y);
            }
            // 将ImageData对象放回Canvas
            // ctx.putImageData(imageData, 0, 0);
            // console.log('finish');
            // clearInterval(interval);
        }
    }
    main();
    var btn_up = document.getElementById('Upbtn');
    var btn_down = document.getElementById('Downbtn');
    var btn_left = document.getElementById('Leftbtn');
    var btn_right = document.getElementById('Rightbtn');
    var btn_front = document.getElementById('Frontbtn');
    var btn_back = document.getElementById('Backbtn');
    var display_step = document.getElementById('valueDisplay');
    var slider_step = document.getElementById('stepsize');
    var display_sample = document.getElementById('DisplaySample');
    var slider_sample = document.getElementById('sample_per_pixel');
    var display_depth = document.getElementById('DisplayDepth');
    var slider_depth = document.getElementById('max_dpeth');
    var display_dtf = document.getElementById('DisplayDtf');
    var slider_dtf = document.getElementById('dist_to_focus');
    var display_ape = document.getElementById('DisplayApe');
    var slider_ape = document.getElementById('aperture');
    var display_num = document.getElementById('DisplayNum');
    var slider_num = document.getElementById('num_generate');
    var btn_activate = document.getElementById('Activate');
    // 按钮事件监听
    if (btn_up) {
        btn_up.addEventListener('click', function () {
            lookfrom.e[1] += Number(slider_step.value);
            main();
        });
    }
    btn_down.addEventListener('click', function () {
        lookfrom.e[1] -= Number(slider_step.value);
        main();
    });
    btn_left.addEventListener('click', function () {
        lookfrom.e[0] -= Number(slider_step.value);
        main();
    });
    btn_right.addEventListener('click', function () {
        lookfrom.e[0] += Number(slider_step.value);
        main();
    });
    btn_front.addEventListener('click', function () {
        lookfrom.e[2] += Number(slider_step.value);
        main();
    });
    btn_back.addEventListener('click', function () {
        lookfrom.e[2] += Number(slider_step.value);
        main();
    });
    btn_activate.addEventListener('click', function () {
        sample_per_pixel = Number(slider_sample.value);
        max_dpeth = Number(slider_depth.value);
        dist_to_focus = Number(slider_dtf.value);
        aperture = Number(slider_ape.value);
        sample_num = Math.ceil(Math.sqrt(Math.sqrt(Number(slider_num.value))));
        main();
    });
    // 移动条事件监听
    slider_step.addEventListener('input', function () {
        display_step.textContent = slider_step.value;
    });
    slider_sample.addEventListener('input', function () {
        display_sample.textContent = "采样数: " + slider_sample.value;
    });
    slider_depth.addEventListener('input', function () {
        display_depth.textContent = "光线反射深度: " + slider_depth.value;
    });
    slider_dtf.addEventListener('input', function () {
        display_dtf.textContent = "焦距: " + slider_dtf.value;
    });
    slider_ape.addEventListener('input', function () {
        display_ape.textContent = "光圈孔径: " + slider_ape.value;
    });
    slider_num.addEventListener('input', function () {
        display_num.textContent = "物体数目（不一定准）: " + slider_num.value;
    });
});
