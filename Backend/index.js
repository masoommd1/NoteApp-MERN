import express, { json } from 'express';
import notesRoutes from './routes/notesRoutes.js';
import cors from "cors"
import { connectDB } from './config/db.js';
import dotenv  from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import { apiMsg } from './controllers/notesController.js';

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();

// middleware
// app.use() - This tells Express "hey, use this middleware for ALL incoming requests"

// What it does: When a client sends data in JSON format (like from a form or API call), this middleware automatically converts that JSON string into a JavaScript object

// Example: If you send {"name": "John", "age": 25} in your request, this middleware makes it available as req.body where you can access it like req.body.name and req.body.age

// CORS: Browser security that prevents frontend from calling APIs on different domains
// Fix: Backend needs to include proper CORS headers to allow your frontend
app.use(cors({
  origin: "http://localhost:5173",
}))
app.use(express.json());   //this middleware will parse json bodies: req.body
app.use(rateLimiter);

app.use((req,res,next)=>{
  console.log(`Request method is ${req.method} and Request URL is ${req.url}`)
  next()
})


app.use("/api/notes", notesRoutes); 
app.use("/",apiMsg);

// database 
connectDB().then(()=> {
  app.listen(PORT, () => {
    console.log('Server is running on port :',PORT);
  });
})
