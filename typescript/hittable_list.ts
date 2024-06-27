import * as Hittable from "./hittable";
import * as SPHERE from "./sphere";
import * as Vector3 from "./vec3";
import * as Ray from "./ray";

export class hittable_list extends Hittable.hittable {
    public objects : Array<SPHERE.Sphere>;
    constructor();
    constructor(object : SPHERE.Sphere);
    constructor(object ?: SPHERE.Sphere){
        super();
        if (typeof object === "undefined" || object === null){
            this.objects = new Array<SPHERE.Sphere>;
        }
        else if(object instanceof SPHERE.Sphere){
            this.objects = new Array<SPHERE.Sphere>;
            this.objects.push(object);
        }
    }
    public clear(){
        this.objects.length = 0;
    }
    public add(object : SPHERE.Sphere){
        this.objects.push(object);
    }
    public hit(r: Ray.ray, t_min: number, t_max: number, rec: Hittable.hit_record):boolean{
        let temp_rec : Hittable.hit_record = new Hittable.hit_record();
        let hit_anything = false;
        let closest_so_far = t_max;
    
        for (let object of this.objects) {
            if (object.hit(r, t_min, closest_so_far, temp_rec)) {
                hit_anything = true;
                closest_so_far = temp_rec.t;
                rec.copy(temp_rec);
            }
        }
    
        return hit_anything;
    }
}