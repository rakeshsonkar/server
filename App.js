import "dotenv/config"
import fastify  from "fastify";
import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";


const start = async () =>{
    await connectDB(process.env.MONGO_URI);
    const app = fastify();
    app.listen({port:PORT || 3001,host:"0.0.0.0"},
        (err,addr)=>{
            if(err){
                console.log(err);
                
            }else{
                console.log("test  server  is  start  ");
                
            }
        }
    )
}

start();