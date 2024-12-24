
import express from 'express';
import {connectDB} from './db/connectDB.js';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());// global middleware
app.use("/api/auth", authRoutes);// middleware handler on the path-> /api/auth

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listening at http://localhost:${PORT}`);
})
