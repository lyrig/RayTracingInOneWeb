// #include "rtweekend.h"

// struct hit_record;

// class material {
//     public:
//         virtual bool scatter(
//             const ray& r_in, const hit_record& rec, color& attenuation, ray& scattered
//         ) const = 0;
// };

import {ray} from './ray'
import { hit_record } from './hittable'
import {vec3} from './vec3'
import * as Vector3 from './vec3'
import * as Ray from './ray'

export abstract class material{
    public abstract scatter(r_in : ray, rec:hit_record, attenuation: vec3, scattered: ray):boolean;
}

export class lambertian extends material {
    public albedo:vec3;
    constructor(a : vec3){
        super();
        this.albedo = new vec3();
        this.albedo.copy(a);
    }

    public scatter(r_in : ray, rec:hit_record, attenuation: vec3, scattered: ray): boolean {
        let scatter_direction = Vector3.add(rec.normal , Vector3.random_unit_vector());
        if (scatter_direction.near_zero()){
            scatter_direction = rec.normal;
        }
        scattered.copy(new Ray.ray(rec.p, scatter_direction));
        attenuation.copy(this.albedo);
        return true;
    }
};

export class metal extends material{
    public albedo:vec3;
    public fuzz:number;
    constructor(a : vec3, f:number){
        super();
        this.albedo = new vec3();
        this.albedo.copy(a);
        this.fuzz = f < 1? f : 1;
    }
    public scatter(r_in: ray, rec: hit_record, attenuation: vec3, scattered: ray): boolean {
        let reflected = Vector3.reflect(Vector3.unit_vector(r_in.direction), rec.normal);
        scattered.copy(new Ray.ray(rec.p, Vector3.add(reflected, Vector3.random_in_unit_sphere().mul(this.fuzz))));
        attenuation.copy(this.albedo);
        return (Vector3.dot(scattered.direction, rec.normal) > 0);
    }
}

export class dielectric extends material{
    public ir:number;
    constructor(index_of_refraction:number){
        super();
        this.ir = index_of_refraction;
    }
    public scatter(r_in: ray, rec: hit_record, attenuation: vec3, scattered: ray): boolean {
        attenuation.copy(new Vector3.vec3([1.0, 1.0, 1.0]));
        let refraction_ratio = rec.front_face ? (1.0 / this.ir) : this.ir;
        let unit_direction = Vector3.unit_vector(r_in.direction);
        
        let cos_theta = Math.min(Vector3.dot(unit_direction.negtive(), rec.normal), 1.0);
        let sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);

        let cannot_refract = refraction_ratio * sin_theta > 1.0;

        let direction = new Vector3.vec3();
        if(cannot_refract || this.reflectance(cos_theta, refraction_ratio) > Math.random()){
            direction.copy(Vector3.reflect(unit_direction, rec.normal));
        }
        else{
            direction.copy(Vector3.refract(unit_direction, rec.normal, refraction_ratio));
        }
        // let refracted = Vector3.refract(unit_direction, rec.normal, refraction_ratio);
        scattered.copy(new Ray.ray(rec.p, direction));
        return true
    }

    private reflectance(cosine:number, ref_idx:number):number{
        let r0 = (1 - ref_idx) / (1 + ref_idx);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow((1 - cosine), 5);
    }
}


