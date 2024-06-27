import * as Hittable from "./hittable";
import * as Vector3 from "./vec3";
import * as Ray from "./ray";
import { material } from "./material";

export class Sphere extends Hittable.hittable {
    public center: Vector3.vec3;
    public radius: number;
    public mat_ptr: material;
    //   material: Hittable.Material;
    constructor();
    constructor(cen:Vector3.vec3, r:number);
    constructor(cen:Vector3.vec3, r:number, m:material)
    constructor(cen?:Vector3.vec3, r?:number, m?:material){
        super();
        if(typeof cen == undefined || typeof r == undefined || typeof m == undefined || cen == null || r == null || m == null)
        {
            this.center = new Vector3.vec3([0,0,0]);
            this.radius = 1;
            console.log('m problem');
        }
        else{
            this.center = new Vector3.vec3(cen);
            this.radius = r;
            this.mat_ptr = m;
        }
    }

    public hit(ray: Ray.ray, t_min: number, t_max: number, rec: Hittable.hit_record): boolean {
        let oc = Vector3.minus(ray.origin, this.center);
        let a = ray.direction.length_squared();
        let half_b = Vector3.dot(oc, ray.direction);
        let c = oc.length_squared() - this.radius * this.radius;
        let discriminant = half_b * half_b - a * c;

        if (discriminant < 0) {
            return false;
        }
        let sqrtd = Math.sqrt(discriminant);
        // Find the nearest root that lies in the acceptable range.
        let root = (-half_b - sqrtd) / a;
        if (root < t_min || t_max < root) {
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root)
                return false;
        }
        rec.t = root;
        rec.p = ray.at(rec.t);
        let outward_normal = Vector3.div(Vector3.minus(rec.p , this.center) , this.radius);
        rec.set_face_normal(ray, outward_normal);
        // console.log('thisptr : ', this.mat_ptr)
        rec.mat_ptr = this.mat_ptr;
        // console.log('RecPtr: ', rec.mat_ptr);
        return true;
    }
}

export function hit(rec : Hittable.hit_record){
    rec.normal = new Vector3.vec3([2,2,2]);
}