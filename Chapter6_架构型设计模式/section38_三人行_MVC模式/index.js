(function(win){
    win.MVC = {};
    MVC.model = function(){
        var M = {};
        M.data = {};
        M.config = {};
        return {
            getData(key){
                return M.data[key];
            },
            setData(key,value){
                M.data[key] = value;
            },
            getConfig(key){
                return M.config[key]
            },
            setConfig(key,value){
                M.config[key] = value;
            }
        }
    }()
    MVC.view = function(){
        var M = MVC.model;
        var V = {
            createSideBar:function(){

            }()
        }
        return function(key){
            V[key]
        }
    }()
    MVC.ctrl = function(){
        var M = MVC.model;
        var V = MVC.view;
        var C = {
            initSideBar:function(){
                V('createSideBar');
            }()
        };
        C.initSideBar;
    }()
})(window)