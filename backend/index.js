
import express from 'express';
import {connectDB} from './db/connectDB.js';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.get("/", (req, res)=>{
    res.send("hello world 123")
})

app.listen(3000, ()=>{
    connectDB();
    console.log(`Server listening at http://localhost:${3000}`);
})

