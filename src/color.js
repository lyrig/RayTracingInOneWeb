"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write_color = void 0;
var OTHERS = require("./others");
function write_color(imageData, x, y, width, height, color, sample_per_pixel) {
    var index = (y * width + x) * 4;
    var r = color.x;
    var g = color.y;
    var b = color.z;
    var scale = 1.0 / sample_per_pixel;
    r *= scale;
    ;
    g *= scale;
    b *= scale;
    // Gamma校正
    r = Math.sqrt(r);
    g = Math.sqrt(g);
    b = Math.sqrt(b);
    imageData.data[index] = OTHERS.clamp(r, 0.0, 0.999) * 255; // 红色
    imageData.data[index + 1] = OTHERS.clamp(g, 0.0, 0.999) * 255; // 绿色
    imageData.data[index + 2] = OTHERS.clamp(b, 0.0, 0.999) * 255; // 蓝色
    imageData.data[index + 3] = 255; // Alpha (不透明)
}
exports.write_color = write_color;
