"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camera = void 0;
var OTHERS = require("./others");
var Vector3 = require("./vec3");
var ray_1 = require("./ray");
var camera = /** @class */ (function () {
    function camera(lookfrom, lookat, vup, vfov, aspect_ratio_, aperture, focus_dist) {
        if (aspect_ratio_ === void 0) { aspect_ratio_ = 16.0 / 9.0; }
        this.u = new Vector3.vec3();
        this.v = new Vector3.vec3();
        this.w = new Vector3.vec3();
        var aspect_ratio = aspect_ratio_;
        var theta = OTHERS.degrees_to_radians(vfov);
        var h = Math.tan(theta / 2);
        var viewport_height = 2.0 * h;
        var viewport_width = aspect_ratio * viewport_height;
        this.w.copy(Vector3.unit_vector(Vector3.minus(lookfrom, lookat)));
        this.u.copy(Vector3.unit_vector(Vector3.cross(vup, this.w)));
        this.v.copy(Vector3.cross(this.w, this.u));
        this.origin = new Vector3.vec3();
        this.origin.copy(lookfrom);
        this.horizontal = new Vector3.vec3();
        this.horizontal.copy(Vector3.mul(this.u, viewport_width).mul(focus_dist));
        this.vertical = new Vector3.vec3();
        this.vertical.copy(Vector3.mul(this.v, viewport_height).mul(focus_dist));
        this.lower_left_corner = Vector3.minus(this.origin, Vector3.div(this.horizontal, 2)).minus(Vector3.div(this.vertical, 2)).minus(Vector3.mul(this.w, focus_dist));
        this.lens_radius = aperture / 2;
    }
    camera.prototype.get_ray = function (s, t) {
        var rd = new Vector3.vec3();
        rd.copy(Vector3.mul(Vector3.random_in_unit_disk(), this.lens_radius));
        var offset = new Vector3.vec3();
        offset.copy(Vector3.add(Vector3.mul(this.u, rd.x), Vector3.mul(this.v, rd.y)));
        return new ray_1.ray(Vector3.add(this.origin, offset), Vector3.add(this.lower_left_corner, Vector3.mul(this.horizontal, s)).add(Vector3.mul(this.vertical, t)).minus(this.origin).minus(offset));
    };
    return camera;
}());
exports.camera = camera;
