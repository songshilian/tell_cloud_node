const jwt = require('jsonwebtoken')
const white = ['/api/shop/login']
module.exports = (action,app)=>{
 return async (ctx,next)=>{
    await next()
    //  if(!white.includes(ctx.path)){
    //     const {authorization} = ctx.request.headers
    //     try{ 
    //         const data = jwt.verify(authorization,app.config.keys)
    //         ctx.state.user = data
    //         await next()
    //     }catch{
    //         ctx.body={
    //             code:"-1",
    //             msg:"权限不足"
    //         }
    //     }
    //  }else{
    //      await next()
    //  }
 }
}