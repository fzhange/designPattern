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
class SubClass_2 extends SuperClass{}


const sub_1_ins = new SubClass_1('SuperClass_SubClass_1');
const sub_2_ins = new SubClass_2();

console.log('sub_1_ins.names.push', sub_1_ins.names.push('babyGirl'),sub_1_ins.getSuperClassName()); 
console.log('sub_1_ins.names',sub_1_ins.names); //['zf','cp','babyGirl'];

console.log('sub_2_ins.names',sub_2_ins.names); //['zf','cp'];




