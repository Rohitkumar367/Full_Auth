
import express from 'express';
const app = express();

app.get("/", (req, res)=>{
    res.send("hello world 123")
})

app.listen(3000, ()=>{
    console.log(`Server listening at http://localhost:${3000}`);
})