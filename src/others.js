"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = exports.random_double = exports.degrees_to_radians = exports.pi = exports.Infinity = void 0;
// 一些常数
exports.Infinity = 1e30;
exports.pi = 3.1415926535897932385;
// 一些函数
function degrees_to_radians(degrees) {
    return degrees * exports.pi / 180.0;
}
exports.degrees_to_radians = degrees_to_radians;
function random_double(min, max) {
    if (typeof min === undefined || min == null || typeof max == undefined || max == null)
        return Math.random();
    else {
        return Math.random() * (max - min) + min;
    }
}
exports.random_double = random_double;
function clamp(x, min, max) {
    if (x < min)
        return min;
    if (x > max)
        return max;
    return x;
}
exports.clamp = clamp;
