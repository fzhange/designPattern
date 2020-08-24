/**
 * 策略模式：将一组算法封装起来，使其可以相互替换，封装的算法具有一定的独立性，不会随客户端变化而变化。
 * 对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如每个人都要“交个人所得税”，但是“在美国交个人所得税”和“在中国交个人所得税”就有不同的算税方法
 */

function LoginController(){
    this.strategy = undefined;
    this.setStrategy = function(strategy){
        this.strategy = strategy;
        this.login = this.strategy.login;
    }
}
const loginController = function(){  /**全局单例  只有一个诸葛亮**/
    function LoginController(){
        this.strategy = undefined;
        this.setStrategy = function(strategy){
            this.strategy = strategy;
            this.login = this.strategy.login;
        }
    }
    return new LoginController();
}()


/**
 * 用户名、密码登录策略
 */

function LocalStragegy(){
    this.login = ({username, password})=>{
        console.log('username, password: ', username, password);
    }
}
/**
 * 手机号、验证码登录策略
 */
function PhoneStragety() {
    this.login = ({ phone, verifyCode }) => {
      console.log(phone, verifyCode);
      // authenticating with hone and verifyCode...
    }
}


const app = {} 

app.use("/login/local",function(req,res){
    loginController.setStrategy(new LocalStragegy());
    loginController.login(req.body);
})

app.use('/login/phone', function (req, res) {
    loginController.setStrategy(new PhoneStragety());
    loginController.login(req.body);
  });  
