import * as OTHERS from './others'
import * as Vector3 from './vec3'
import { ray } from './ray'

export class camera{
    public origin : Vector3.vec3;
    public lower_left_corner : Vector3.vec3;
    public horizontal : Vector3.vec3;
    public vertical : Vector3.vec3;
    public lens_radius: number;
    public u : Vector3.vec3 = new Vector3.vec3();
    public v : Vector3.vec3 = new Vector3.vec3();
    public w : Vector3.vec3 = new Vector3.vec3(); 
    constructor(lookfrom:Vector3.vec3,  lookat:Vector3.vec3, vup:Vector3.vec3, vfov:number, aspect_ratio_ : number = 16.0 / 9.0, 
                aperture:number, focus_dist: number){
        let aspect_ratio = aspect_ratio_;
        let theta = OTHERS.degrees_to_radians(vfov);
        let h = Math.tan(theta / 2);
        let viewport_height = 2.0 * h;
        let viewport_width = aspect_ratio * viewport_height;

        this.w.copy(Vector3.unit_vector(Vector3.minus(lookfrom , lookat)));
        this.u.copy(Vector3.unit_vector(Vector3.cross(vup, this.w)));
        this.v.copy(Vector3.cross(this.w, this.u));


        this.origin = new Vector3.vec3();
        this.origin.copy(lookfrom);

        this.horizontal = new Vector3.vec3();
        this.horizontal.copy(Vector3.mul(this.u, viewport_width).mul(focus_dist));
        this.vertical = new Vector3.vec3();
        this.vertical.copy(Vector3.mul(this.v, viewport_height).mul(focus_dist));
        this.lower_left_corner = Vector3.minus(this.origin, Vector3.div(this.horizontal, 2)).minus(Vector3.div(this.vertical, 2)).minus(Vector3.mul(this.w, focus_dist));
        this.lens_radius = aperture / 2;
    }

    public get_ray(s : number, t : number) : ray{
        let rd = new Vector3.vec3();
        rd.copy(Vector3.mul(Vector3.random_in_unit_disk(), this.lens_radius));
        let offset = new Vector3.vec3();
        offset.copy(Vector3.add(Vector3.mul(this.u, rd.x), Vector3.mul(this.v, rd.y)))
        return new ray(
            Vector3.add(this.origin, offset),
             Vector3.add(this.lower_left_corner, Vector3.mul(this.horizontal, s)).add(Vector3.mul(this.vertical, t)).minus(this.origin).minus(offset));
    }

}