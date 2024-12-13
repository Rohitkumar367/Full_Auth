
// dotenv, which is used to load environment variables from a .env file into process.env
import dotenv from 'dotenv'
dotenv.config() // loads the environment variables defined in the .env file and makes them accessible via process.env

import express from 'express'
const app = express()
app.use(express.json()) // resposible for converting the data into json format during post, put, delete requests, without it the req.body would be a raw string

// Imprts CORS(cross-origin resource sharing) middleware, which allows your server to handle cross-origin requests (e.g., from a frontend running on a different port or domain).
import cors from 'cors';
app.use(cors()) //This allows your backend to handle requests from a different origin (e.g., a React front end running on a different server).

// imported connectDB function for the database connectivity
import connectDB from './config/connectdb.js'
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL); // database connection


// retrienvs the value of the PORT environment variable which was loaded using dotenv.config() earlier
const port = process.env.PORT



app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})


