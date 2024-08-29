const asynchandler = (requesthandler)=>{
return (req, res , next) =>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
}
}
export {asynchandler}
// asynchandler is generally recommended for most asynchronous route handlers in Express.js to simplify error handling and improve code readability.
// Direct mapped routes without asynchandler can be used for simple, synchronous handlers, but consider using asynchandler as your application grows and incorporates more asynchronous operations.
// jab error aati hai tab hum message, error code bhejte hai 

// 2 way
// const asynchandler = (func) => async () =>{
// try{
// await func(res,res,next)
// }catch(error){
//     res.status(err.code || 500 ).json({
//         success:false,
//         message: err.message
//     })
// }
// }
