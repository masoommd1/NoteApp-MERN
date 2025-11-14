import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config()


//  * Rate limiter prevents abuse by limiting how many requests
//  * a user can make within a specific time window
//    creating a ratelimiter for 100 req per 60 sec 

const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s")
})

export default ratelimit;