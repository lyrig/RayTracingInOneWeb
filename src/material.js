"use strict";
// #include "rtweekend.h"
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.dielectric = exports.metal = exports.lambertian = exports.material = void 0;
var vec3_1 = require("./vec3");
var Vector3 = require("./vec3");
var Ray = require("./ray");
var material = /** @class */ (function () {
    function material() {
    }
    return material;
}());
exports.material = material;
var lambertian = /** @class */ (function (_super) {
    __extends(lambertian, _super);
    function lambertian(a) {
        var _this = _super.call(this) || this;
        _this.albedo = new vec3_1.vec3();
        _this.albedo.copy(a);
        return _this;
    }
    lambertian.prototype.scatter = function (r_in, rec, attenuation, scattered) {
        var scatter_direction = Vector3.add(rec.normal, Vector3.random_unit_vector());
        if (scatter_direction.near_zero()) {
            scatter_direction = rec.normal;
        }
        scattered.copy(new Ray.ray(rec.p, scatter_direction));
        attenuation.copy(this.albedo);
        return true;
    };
    return lambertian;
}(material));
exports.lambertian = lambertian;
;
var metal = /** @class */ (function (_super) {
    __extends(metal, _super);
    function metal(a, f) {
        var _this = _super.call(this) || this;
        _this.albedo = new vec3_1.vec3();
        _this.albedo.copy(a);
        _this.fuzz = f < 1 ? f : 1;
        return _this;
    }
    metal.prototype.scatter = function (r_in, rec, attenuation, scattered) {
        var reflected = Vector3.reflect(Vector3.unit_vector(r_in.direction), rec.normal);
        scattered.copy(new Ray.ray(rec.p, Vector3.add(reflected, Vector3.random_in_unit_sphere().mul(this.fuzz))));
        attenuation.copy(this.albedo);
        return (Vector3.dot(scattered.direction, rec.normal) > 0);
    };
    return metal;
}(material));
exports.metal = metal;
var dielectric = /** @class */ (function (_super) {
    __extends(dielectric, _super);
    function dielectric(index_of_refraction) {
        var _this = _super.call(this) || this;
        _this.ir = index_of_refraction;
        return _this;
    }
    dielectric.prototype.scatter = function (r_in, rec, attenuation, scattered) {
        attenuation.copy(new Vector3.vec3([1.0, 1.0, 1.0]));
        var refraction_ratio = rec.front_face ? (1.0 / this.ir) : this.ir;
        var unit_direction = Vector3.unit_vector(r_in.direction);
        var cos_theta = Math.min(Vector3.dot(unit_direction.negtive(), rec.normal), 1.0);
        var sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);
        var cannot_refract = refraction_ratio * sin_theta > 1.0;
        var direction = new Vector3.vec3();
        if (cannot_refract || this.reflectance(cos_theta, refraction_ratio) > Math.random()) {
            direction.copy(Vector3.reflect(unit_direction, rec.normal));
        }
        else {
            direction.copy(Vector3.refract(unit_direction, rec.normal, refraction_ratio));
        }
        // let refracted = Vector3.refract(unit_direction, rec.normal, refraction_ratio);
        scattered.copy(new Ray.ray(rec.p, direction));
        return true;
    };
    dielectric.prototype.reflectance = function (cosine, ref_idx) {
        var r0 = (1 - ref_idx) / (1 + ref_idx);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow((1 - cosine), 5);
    };
    return dielectric;
}(material));
exports.dielectric = dielectric;
