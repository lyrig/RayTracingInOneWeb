import * as Ray from "./ray";
import * as Vector3 from "./vec3";
import { material } from "./material";

export class hit_record{
    public p : Vector3.vec3 = new Vector3.vec3([0, 0, 0]);
    public normal : Vector3.vec3 = new Vector3.vec3([0, 0, 0]);
    public t : number = 0;
    public front_face:boolean = true;
    public mat_ptr: material;
    public set_face_normal(r: Ray.ray, outward_normal: Vector3.vec3){
        this.front_face = Vector3.dot(r.direction, outward_normal) < 0;
        this.normal = this.front_face? outward_normal : new Vector3.vec3(outward_normal).negtive();
    }
    public copy(rec : hit_record){
        this.p = rec.p;
        this.normal = rec.normal;
        this.t = rec.t;
        this.front_face = rec.front_face;
        this.mat_ptr = rec.mat_ptr;
    }
}

export abstract class hittable{
    public abstract hit(r: Ray.ray, t_min: number, t_max: number, rec: hit_record):void;
}
