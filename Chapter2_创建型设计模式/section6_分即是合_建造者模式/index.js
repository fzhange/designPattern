/**
 * 简单工厂模式 工厂模式 中返回的都是独立的对象。
 * 建造者模式 是对象的整合 关心对象的创建过程
 */

var Human = function(skill){
    this.skill = skill || "保密";
}
Human.prototype = {
    getSkill:function(){
        return this.skill;
    }
}

var Named = function(name){
    var that = this;
    (function(name,that){   
        that.wholeName = name;
        if(name.indexOF('.') > -1){
            that.firstName = name.split('.').slice(0,1);
            that.secondName = name.split('.').slice(1);
        }
    })(name,that)
}
var Work = function(work){
    switch(work){
        case 'code': 
            this.work = '工程师';
            this.descript = '喜欢钻研';
        break;
        case 'ui': 
            this.work = "设计师";
            this.descript = "设计出与众不同"
        break;
        case "teacher":Factory      
            this.work = "教师";
            this.descript = "教书育人";
        break; 
    }
}
Work.prototype = {
    changeWork:function(work){
        this.work = work;
    },
    changDescript:function(descript){
        this.descript = descript;
    }
}


var Person = function(skill,name,work){
    var _Person = new Human(skill);
    _Person.name = new Named(name);
    _Person.work = new Work(work);
    return _Person;
}

