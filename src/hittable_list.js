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
exports.hittable_list = void 0;
var Hittable = require("./hittable");
var SPHERE = require("./sphere");
var hittable_list = /** @class */ (function (_super) {
    __extends(hittable_list, _super);
    function hittable_list(object) {
        var _this = _super.call(this) || this;
        if (typeof object === "undefined" || object === null) {
            _this.objects = new Array;
        }
        else if (object instanceof SPHERE.Sphere) {
            _this.objects = new Array;
            _this.objects.push(object);
        }
        return _this;
    }
    hittable_list.prototype.clear = function () {
        this.objects.length = 0;
    };
    hittable_list.prototype.add = function (object) {
        this.objects.push(object);
    };
    hittable_list.prototype.hit = function (r, t_min, t_max, rec) {
        var temp_rec = new Hittable.hit_record();
        var hit_anything = false;
        var closest_so_far = t_max;
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object.hit(r, t_min, closest_so_far, temp_rec)) {
                hit_anything = true;
                closest_so_far = temp_rec.t;
                rec.copy(temp_rec);
            }
        }
        return hit_anything;
    };
    return hittable_list;
}(Hittable.hittable));
exports.hittable_list = hittable_list;
