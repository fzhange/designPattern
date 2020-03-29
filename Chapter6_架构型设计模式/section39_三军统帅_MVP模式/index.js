(function(win){
    win.MVP = function(){

    }
    MVP.model = function(){
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
    MVP.view = function(){}
    MVP.presenter = function(){}; 
    MVP.init = {};
})(window)