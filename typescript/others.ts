
// 一些常数
export const Infinity:number = 1e30;
export const pi:number = 3.1415926535897932385;



// 一些函数
export function degrees_to_radians(degrees:number) {
    return degrees * pi / 180.0;
}

export function random_double():number;
export function random_double(min:number, max:number):number;
export function random_double(min?:number, max?:number):number{
    if (typeof min === undefined || min == null || typeof max == undefined || max == null)
        return Math.random();
    else{
        return Math.random() * (max - min) + min;
    }
}

export function clamp(x:number, min:number, max:number):number{
    if (x < min) return min;
    if (x > max) return max;
    return x;
}