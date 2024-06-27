"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hittable = exports.hit_record = void 0;
var Vector3 = require("./vec3");
var hit_record = /** @class */ (function () {
    function hit_record() {
        this.p = new Vector3.vec3([0, 0, 0]);
        this.normal = new Vector3.vec3([0, 0, 0]);
        this.t = 0;
        this.front_face = true;
    }
    hit_record.prototype.set_face_normal = function (r, outward_normal) {
        this.front_face = Vector3.dot(r.direction, outward_normal) < 0;
        this.normal = this.front_face ? outward_normal : new Vector3.vec3(outward_normal).negtive();
    };
    hit_record.prototype.copy = function (rec) {
        this.p = rec.p;
        this.normal = rec.normal;
        this.t = rec.t;
        this.front_face = rec.front_face;
        this.mat_ptr = rec.mat_ptr;
    };
    return hit_record;
}());
exports.hit_record = hit_record;
var hittable = /** @class */ (function () {
    function hittable() {
    }
    return hittable;
}());
exports.hittable = hittable;
