/**
 * 在系统沿着多个维度变化同时，又不增加其复杂度并达到解耦。
 */
/**
 * 创建抽象单元
 */
class Speed{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    run(){
        console.log('speed in running');
    }
}

class Color{
    constructor(color){
        this.color = color;
    }
    draw(){
        console.log('绘制颜色')
    }
}

class Shape{
    constructor(shape){
        this.shape = shape;
    }
    chang(){
        console.log('改变形状');
    }
}

class Speek{
    constructor(word){
        this.word = word;
    }
    say(){
        console.log('书写字体')
    }
}

/**
 * 创建球类
 */
class Ball{
    constructor(x,y,c){
        this.speed = new Speed(x,y);
        this.color = new Color(c);
    }
    init(){
        this.speed.run(); //开始球类运动
        this.color.draw(); //开始球类上色
    }
}
new Ball(1,2,'red').init();
/**
 * 创建一个人
 */
class People{
    constructor(x,y,w){
        this.speed = new Speed(x,y);
        this.speek = new Speek(w);
    }
    init(){
        this.speed.run(); 
        this.speek.say();
    }
}
new People().init(1,2,'word');
