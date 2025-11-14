import ratelimit from "../config/upstash.js";



// ratelimter function 


const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit")

        if(!success) {
            return res.status(429).json({
                message:"Too Many Request!, Please Try Again Later"})
        }

        next()
    } catch (error) {
        console.log("Rate Limiter error!")
        next(error);
    }
}   


export default rateLimiter;