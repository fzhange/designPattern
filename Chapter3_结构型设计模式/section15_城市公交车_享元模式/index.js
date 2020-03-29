/**
 * 运用共享技术有效的支持大量细力度对象，避免对象拥有形同内容造成冗余开销
 */

 class FlyWeight{
    moveX(x){
        this.x = x; 
        return this;
    }
    getX(){
        return this.x;
    }
    moveY(y){
        this.y = y;
        return this;
    }
    getY(){
        return this.y;
    }
 }

class Player extends FlyWeight{
    constructor(x=0,y=0){
        super();
        this.x = x;
        this.y = y;
    }
}
console.log(new Player(20,20).moveY(30).getY())
