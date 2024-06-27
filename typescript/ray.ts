import * as Vector3 from './vec3';

export class ray{
    public orig:Vector3.vec3;
    public dir:Vector3.vec3;

    constructor();
    constructor(origin:Vector3.vec3, direction:Vector3.vec3);
    constructor(origin?:Vector3.vec3, direction?:Vector3.vec3){
        if(typeof origin === 'undefined' || typeof direction === 'undefined'){
            this.orig = new Vector3.vec3([0,0,0]);
            this.dir = new Vector3.vec3([0,0,0]);
        }
        else if(origin instanceof Vector3.vec3 && direction instanceof Vector3.vec3){
            this.orig = new Vector3.vec3(origin);
            this.dir = new Vector3.vec3(direction);
        }
        else{
            throw new Error('ray: Invalid arguments');
        }
    }
    public get origin():Vector3.vec3{
        return this.orig;
    }
    public get direction():Vector3.vec3{
        return this.dir;
    }
    public set direction(dir:Vector3.vec3){
        this.dir = new Vector3.vec3(dir);
    }
    public set origin(origin:Vector3.vec3){
        this.orig = new Vector3.vec3(origin);
    }
    public at(t:number):Vector3.vec3{
        return Vector3.add(this.orig, Vector3.mul(this.dir, t));
    }
    public copy(a : ray){
        this.orig = a.orig;
        this.dir = a.dir;
    }
}