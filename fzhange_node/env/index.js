// NODE=pro node env/index.js  
console.log(process.env.NODE);  //pro

let env = process.env.NODE;
let config = {
    pro:require('./pro.json'),
    dev:require('./dev.json')
}
module.exports = config[env]