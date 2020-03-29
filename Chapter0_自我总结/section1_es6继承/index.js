class SuperClass{
    constructor(superClassName='defaultName'){
        this.superClassName = superClassName;
        this.names = ['zf','cp'];
    }
    static getName(){
        console.log(this.names);
    }
    getSuperClassName(){
        return this.superClassName;
    }
}

class SubClass_1 extends SuperClass{
    constructor(superClassName){
       super(superClassName);
    }
}
class SubClass_2 extends SuperClass{

}
console.log('new SubClass_1(SuperClass_SubClass_1).names.push(babyGirl)', new SubClass_1('SuperClass_SubClass_1').names.push('babyGirl'));
console.log('new SubClass_2()',new SubClass_2()); 
console.log('new SubClass_2().names',new SubClass_2().names); //['zf','cp']
console.log('static SuperClass.getName',SuperClass.getName()); //undefined




