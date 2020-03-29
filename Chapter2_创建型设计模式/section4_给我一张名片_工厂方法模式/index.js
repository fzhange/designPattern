var Factory = (function(){
    /** LoginBase start */
    function LoginBase(content){
        this.content = content;
    }
    LoginBase.prototype.show = function(){
        console.log('show');
    }
    LoginBase.prototype.hide = function(){
        console.log('hide');
    }
    /** LoginBase end */
    /** LoginAlert start */
    function LoginAlert(contnet){
        LoginBase.call(this,contnet);
    }
    LoginAlert.prototype = new LoginBase();
    /** LoginAlert end */
    /** LoginRegister start */
    function LoginRegister(contnet){
        LoginBase.call(this,contnet);
        this.register = 'i m register';
    }
    LoginRegister.prototype = new LoginBase();
    /** LoginRegister end */
    /** LoginPrompt start */
    function LoginPrompt(contnet){
        LoginBase.call(this,contnet);
        this.prompt = 'i m prompt';
    }
    LoginPrompt.prototype = new LoginBase();
    /** LoginPrompt end */
    /** _factory start */
    var _factory = function(type,content){
        /** 安全检查 */
        if(this instanceof _factory){ 
            return new this[type](content);
        }else{
            new _factory(type,content);
        }
    }
    _factory.prototype = {
        alert:LoginAlert,
        register:LoginRegister,
        prompt:LoginPrompt
    }
    /** _factory end */
    return _factory;
})()

var _alert =  Factory('alert','i m zf');
var _register =  Factory('register', 'i m cp');
var _prompt =  Factory('prompt', 'i m babyGirl');