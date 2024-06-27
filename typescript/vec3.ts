import * as OTHERS from './others'

export class vec3{
    public e:  number[] = [];  // (x, y, z); (r, g, b)

    constructor();
    constructor(value: vec3);
    constructor(value: number[]);
    constructor(value?: vec3|number[]) {
      if (value === undefined) {
        this.e.push(0.0, 0.0, 0.0);
      } 
      else if(value instanceof vec3){
        this.e.push(value.x, value.y, value.z);
      }
      else if(value instanceof Array && value.length === 3){
        this.e = value;
      }
      else{
        console.log("No value provided");
      }
    }

    // 用于直接提取x,y,z的属性
    public get x():number{
        return this.e[0];
    }
    public get y():number{
        return this.e[1];
    }
    public get z():number{
        return this.e[2];
    }
    public set x(value:number){
        this.e[0] = value;
    }
    public set y(value:number){
        this.e[1] = value;
    }
    public set z(value:number){
        this.e[2] = value;
    }

    public get(index:number):number{
        return this.e[index];
    }
    public set(index:number, value:number): void{
        this.e[index] = value;
    }

    public add(ohter:vec3):vec3{
        this.e[0] += ohter.e[0];
        this.e[1] += ohter.e[1];
        this.e[2] += ohter.e[2];
        return this;
    }

    public minus(ohter:vec3):vec3{
        this.e[0] -= ohter.e[0];
        this.e[1] -= ohter.e[1];
        this.e[2] -= ohter.e[2];
        return this;
    }

    public negtive():vec3{
        this.e[0] = -this.e[0];
        this.e[1] = -this.e[1];
        this.e[2] = -this.e[2];
        return this;
    }

    public mul(value:number):vec3{
        this.e[0] *=  value;
        this.e[1] *=  value;
        this.e[2] *=  value;
        return this;
    }

    public div(value:number):vec3{
        return this.mul(1.0/value);
    }

    public length():number{
        return Math.sqrt(this.e[0]*this.e[0] + this.e[1]*this.e[1] + this.e[2]*this.e[2]);
    }

    public length_squared():number{
        return  this.e[0]*this.e[0] + this.e[1]*this.e[1] + this.e[2]*this.e[2];
    }
    public copy(a : vec3): void{
        this.e[0] = a.e[0];
        this.e[1] = a.e[1];
        this.e[2] = a.e[2];
    }
    public near_zero(): boolean {
        // Return true if the vector is close to zero in all dimensions.
        const s = 1e-8;
        return (Math.abs(this.e[0]) < s) && (Math.abs(this.e[1]) < s) && (Math.abs(this.e[2]) < s);
    }

}

export type point3 = vec3;   // 3D point
export type color = vec3;    // RGB color

export function add(a:vec3, b:vec3):vec3{
    return  new vec3(a).add(b);
}
export function minus(a:vec3, b:vec3):vec3{
    return  new vec3(a).minus(b);
}
export function negtive(a:vec3):vec3{
    return  new vec3(a).negtive();
}
export function mul(a:vec3, b:number|vec3):vec3{
    if (typeof b === 'number')
    {
        return new vec3(a).mul(b);
    }
    else if(b instanceof vec3)
    {
        return  new vec3([a.x * b.x, a.y * b.y, a.z * b.z]);
    }
    throw new Error("Invalid parameter");
    return new vec3([0.0, 0.0, 0.0]);
}
export function div(a:vec3, b:number):vec3{
    return new vec3(a).div(b);
}
export function dot(a:vec3, b:vec3):number{
    return a.x * b.x + a.y * b.y + a.z * b.z;
}
export function cross(a:vec3, b:vec3):vec3{
    return new vec3([a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x]);
}
export function unit_vector(a:vec3):vec3{
    return new vec3(a).div(a.length());
}
export function random():vec3;
export function random(min:number, max:number):vec3;
export function random(min?:number, max?:number):vec3{
    if(typeof min === undefined || min == null || max == null || typeof max == undefined)
        return new vec3([OTHERS.random_double(), OTHERS.random_double(), OTHERS.random_double()]);
    else{
        return new vec3([OTHERS.random_double(min, max), OTHERS.random_double(min, max), OTHERS.random_double(min, max)]);
    }
}
export function random_in_unit_sphere():vec3{
    while(true){
        let p = random(-1, 1); // ！！！！这个地方有Bug，只会生成0点，需要修改！！！！Bug 修改了
        if(p.length_squared() >= 1)
            continue;
        // console.log(p);
        return p;
    }
}
export function random_unit_vector():vec3 {
    return unit_vector(random_in_unit_sphere());
}

export function random_in_hemisphere(normal : vec3):vec3{
    let in_unit_sphere = random_in_unit_sphere();
    if (dot(in_unit_sphere, normal) > 0.0){
        return in_unit_sphere;
    } 
    else{
        return in_unit_sphere.negtive();
    }
}

export function copy(a : vec3, b:vec3):void{
    a.copy(b);
}
export function reflect(v: vec3, n:vec3) {
    return minus(v, mul(n, dot(v, n)).mul(2));
}

export function refract(uv : vec3, n:vec3, etai_over_etat:number):vec3{
    let cos_theta = Math.min(dot(uv.negtive(), n), 1.0);
    let r_out_perp = add(uv, mul(n, cos_theta)).mul(etai_over_etat);
    let r_out_parallel = mul(n, -Math.sqrt(Math.abs(1.0 - r_out_perp.length_squared())));
    return add(r_out_parallel, r_out_perp);
}

export function random_in_unit_disk() {
    while (true) {
        let p = new vec3([OTHERS.random_double(-1,1), OTHERS.random_double(-1,1), 0]);
        if (p.length_squared() >= 1) continue;
        return p;
    }
}