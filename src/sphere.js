"use strict";
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
exports.hit = exports.Sphere = void 0;
var Hittable = require("./hittable");
var Vector3 = require("./vec3");
var Sphere = /** @class */ (function (_super) {
    __extends(Sphere, _super);
    function Sphere(cen, r, m) {
        var _this = _super.call(this) || this;
        if (typeof cen == undefined || typeof r == undefined || typeof m == undefined || cen == null || r == null || m == null) {
            _this.center = new Vector3.vec3([0, 0, 0]);
            _this.radius = 1;
            console.log('m problem');
        }
        else {
            _this.center = new Vector3.vec3(cen);
            _this.radius = r;
            _this.mat_ptr = m;
        }
        return _this;
    }
    Sphere.prototype.hit = function (ray, t_min, t_max, rec) {
        var oc = Vector3.minus(ray.origin, this.center);
        var a = ray.direction.length_squared();
        var half_b = Vector3.dot(oc, ray.direction);
        var c = oc.length_squared() - this.radius * this.radius;
        var discriminant = half_b * half_b - a * c;
        if (discriminant < 0) {
            return false;
        }
        var sqrtd = Math.sqrt(discriminant);
        // Find the nearest root that lies in the acceptable range.
        var root = (-half_b - sqrtd) / a;
        if (root < t_min || t_max < root) {
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root)
                return false;
        }
        rec.t = root;
        rec.p = ray.at(rec.t);
        var outward_normal = Vector3.div(Vector3.minus(rec.p, this.center), this.radius);
        rec.set_face_normal(ray, outward_normal);
        // console.log('thisptr : ', this.mat_ptr)
        rec.mat_ptr = this.mat_ptr;
        // console.log('RecPtr: ', rec.mat_ptr);
        return true;
    };
    return Sphere;
}(Hittable.hittable));
exports.Sphere = Sphere;
function hit(rec) {
    rec.normal = new Vector3.vec3([2, 2, 2]);
}
exports.hit = hit;
