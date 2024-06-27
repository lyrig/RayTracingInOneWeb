"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random_in_unit_disk = exports.refract = exports.reflect = exports.copy = exports.random_in_hemisphere = exports.random_unit_vector = exports.random_in_unit_sphere = exports.random = exports.unit_vector = exports.cross = exports.dot = exports.div = exports.mul = exports.negtive = exports.minus = exports.add = exports.vec3 = void 0;
var OTHERS = require("./others");
var vec3 = /** @class */ (function () {
    function vec3(value) {
        this.e = []; // (x, y, z); (r, g, b)
        if (value === undefined) {
            this.e.push(0.0, 0.0, 0.0);
        }
        else if (value instanceof vec3) {
            this.e.push(value.x, value.y, value.z);
        }
        else if (value instanceof Array && value.length === 3) {
            this.e = value;
        }
        else {
            console.log("No value provided");
        }
    }
    Object.defineProperty(vec3.prototype, "x", {
        // 用于直接提取x,y,z的属性
        get: function () {
            return this.e[0];
        },
        set: function (value) {
            this.e[0] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "y", {
        get: function () {
            return this.e[1];
        },
        set: function (value) {
            this.e[1] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(vec3.prototype, "z", {
        get: function () {
            return this.e[2];
        },
        set: function (value) {
            this.e[2] = value;
        },
        enumerable: false,
        configurable: true
    });
    vec3.prototype.get = function (index) {
        return this.e[index];
    };
    vec3.prototype.set = function (index, value) {
        this.e[index] = value;
    };
    vec3.prototype.add = function (ohter) {
        this.e[0] += ohter.e[0];
        this.e[1] += ohter.e[1];
        this.e[2] += ohter.e[2];
        return this;
    };
    vec3.prototype.minus = function (ohter) {
        this.e[0] -= ohter.e[0];
        this.e[1] -= ohter.e[1];
        this.e[2] -= ohter.e[2];
        return this;
    };
    vec3.prototype.negtive = function () {
        this.e[0] = -this.e[0];
        this.e[1] = -this.e[1];
        this.e[2] = -this.e[2];
        return this;
    };
    vec3.prototype.mul = function (value) {
        this.e[0] *= value;
        this.e[1] *= value;
        this.e[2] *= value;
        return this;
    };
    vec3.prototype.div = function (value) {
        return this.mul(1.0 / value);
    };
    vec3.prototype.length = function () {
        return Math.sqrt(this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]);
    };
    vec3.prototype.length_squared = function () {
        return this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2];
    };
    vec3.prototype.copy = function (a) {
        this.e[0] = a.e[0];
        this.e[1] = a.e[1];
        this.e[2] = a.e[2];
    };
    vec3.prototype.near_zero = function () {
        // Return true if the vector is close to zero in all dimensions.
        var s = 1e-8;
        return (Math.abs(this.e[0]) < s) && (Math.abs(this.e[1]) < s) && (Math.abs(this.e[2]) < s);
    };
    return vec3;
}());
exports.vec3 = vec3;
function add(a, b) {
    return new vec3(a).add(b);
}
exports.add = add;
function minus(a, b) {
    return new vec3(a).minus(b);
}
exports.minus = minus;
function negtive(a) {
    return new vec3(a).negtive();
}
exports.negtive = negtive;
function mul(a, b) {
    if (typeof b === 'number') {
        return new vec3(a).mul(b);
    }
    else if (b instanceof vec3) {
        return new vec3([a.x * b.x, a.y * b.y, a.z * b.z]);
    }
    throw new Error("Invalid parameter");
    return new vec3([0.0, 0.0, 0.0]);
}
exports.mul = mul;
function div(a, b) {
    return new vec3(a).div(b);
}
exports.div = div;
function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
exports.dot = dot;
function cross(a, b) {
    return new vec3([a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x]);
}
exports.cross = cross;
function unit_vector(a) {
    return new vec3(a).div(a.length());
}
exports.unit_vector = unit_vector;
function random(min, max) {
    if (typeof min === undefined || min == null || max == null || typeof max == undefined)
        return new vec3([OTHERS.random_double(), OTHERS.random_double(), OTHERS.random_double()]);
    else {
        return new vec3([OTHERS.random_double(min, max), OTHERS.random_double(min, max), OTHERS.random_double(min, max)]);
    }
}
exports.random = random;
function random_in_unit_sphere() {
    while (true) {
        var p = random(-1, 1); // ！！！！这个地方有Bug，只会生成0点，需要修改！！！！Bug 修改了
        if (p.length_squared() >= 1)
            continue;
        // console.log(p);
        return p;
    }
}
exports.random_in_unit_sphere = random_in_unit_sphere;
function random_unit_vector() {
    return unit_vector(random_in_unit_sphere());
}
exports.random_unit_vector = random_unit_vector;
function random_in_hemisphere(normal) {
    var in_unit_sphere = random_in_unit_sphere();
    if (dot(in_unit_sphere, normal) > 0.0) {
        return in_unit_sphere;
    }
    else {
        return in_unit_sphere.negtive();
    }
}
exports.random_in_hemisphere = random_in_hemisphere;
function copy(a, b) {
    a.copy(b);
}
exports.copy = copy;
function reflect(v, n) {
    return minus(v, mul(n, dot(v, n)).mul(2));
}
exports.reflect = reflect;
function refract(uv, n, etai_over_etat) {
    var cos_theta = Math.min(dot(uv.negtive(), n), 1.0);
    var r_out_perp = add(uv, mul(n, cos_theta)).mul(etai_over_etat);
    var r_out_parallel = mul(n, -Math.sqrt(Math.abs(1.0 - r_out_perp.length_squared())));
    return add(r_out_parallel, r_out_perp);
}
exports.refract = refract;
function random_in_unit_disk() {
    while (true) {
        var p = new vec3([OTHERS.random_double(-1, 1), OTHERS.random_double(-1, 1), 0]);
        if (p.length_squared() >= 1)
            continue;
        return p;
    }
}
exports.random_in_unit_disk = random_in_unit_disk;
