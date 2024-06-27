"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ray = void 0;
var Vector3 = require("./vec3");
var ray = /** @class */ (function () {
    function ray(origin, direction) {
        if (typeof origin === 'undefined' || typeof direction === 'undefined') {
            this.orig = new Vector3.vec3([0, 0, 0]);
            this.dir = new Vector3.vec3([0, 0, 0]);
        }
        else if (origin instanceof Vector3.vec3 && direction instanceof Vector3.vec3) {
            this.orig = new Vector3.vec3(origin);
            this.dir = new Vector3.vec3(direction);
        }
        else {
            throw new Error('ray: Invalid arguments');
        }
    }
    Object.defineProperty(ray.prototype, "origin", {
        get: function () {
            return this.orig;
        },
        set: function (origin) {
            this.orig = new Vector3.vec3(origin);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ray.prototype, "direction", {
        get: function () {
            return this.dir;
        },
        set: function (dir) {
            this.dir = new Vector3.vec3(dir);
        },
        enumerable: false,
        configurable: true
    });
    ray.prototype.at = function (t) {
        return Vector3.add(this.orig, Vector3.mul(this.dir, t));
    };
    ray.prototype.copy = function (a) {
        this.orig = a.orig;
        this.dir = a.dir;
    };
    return ray;
}());
exports.ray = ray;
