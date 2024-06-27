import * as vector3 from "./vec3";
import * as OTHERS from './others'

export function write_color(imageData:ImageData, x:number, y:number, width:number, height:number,color:vector3.color, sample_per_pixel:number):void{
    const index = (y * width + x) * 4;

    let r = color.x;
    let g = color.y;
    let b = color.z;

    let scale = 1.0 / sample_per_pixel;
    r *= scale;;
    g *= scale;
    b *= scale;

    // Gamma校正
    r = Math.sqrt(r);
    g = Math.sqrt(g);
    b = Math.sqrt(b);

    imageData.data[index] = OTHERS.clamp(r, 0.0, 0.999) * 255;     // 红色
    imageData.data[index + 1] = OTHERS.clamp(g, 0.0, 0.999) * 255; // 绿色
    imageData.data[index + 2] = OTHERS.clamp(b, 0.0, 0.999) * 255; // 蓝色
    imageData.data[index + 3] = 255;           // Alpha (不透明)
}