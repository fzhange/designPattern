const http = require("http");

function compose(middlewares){
  let idx = middlewares.length-1;
  return (ctx)=>{
    //队列的思想
    function executeMiddleWare(){
      let fun = middlewares[idx];
      if(!!fun) {
        idx--;
        // if(idx<0) idx = middlewares.length-1;
        return fun(ctx,executeMiddleWare);
      }  
    }
    return executeMiddleWare();
  }
}
class Context{
  constructor(req,res){
    this.req = req;
    this.res = res;
  }
}

class App{
  constructor(){
    this.middlewares = [];
  }
  listen(port){
    const server = http.createServer(async (req,res)=>{
      const fn = compose(this.middlewares);
      let ctx = new Context(req,res);
      try{
        await fn(ctx);
        ctx.res.end(ctx.body)
      }catch(error){
        console.error(error);
        ctx.res.statusCode = 500;
        ctx.res.end('Internel Server Error');
      }
    });
    server.listen(port);
  }
  use(middleware){
    //  this.middlewares.push(middleware);
    this.middlewares.unshift(middleware) //队列 先进先出
  }
}

/** EXAMPLE */
let app =  new App();
app.use(async (ctx, next) => {
  console.log('Middleware 1 Start')
  let nextMiddleWareName =  await next()
  console.log('nextMiddleWareName: ', nextMiddleWareName);
  console.log('Middleware 1 End')
})

app.use(async (ctx, next) => {
  console.log('Middleware 2 Start')
  await next();
  console.log('Middleware 2 End')
  ctx.body = 'hello, world'
  return "Middleware__2222222";
})

app.listen(8080);








