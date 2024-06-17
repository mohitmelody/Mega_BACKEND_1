const asynchandler = (requesthandler)=>{
 return (req, res , next) =>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
}
}
export {asynchandler}
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