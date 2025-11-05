import express, { Request, Response } from "express";
import connectDB from "./config/dbConfig";
import apiRouter from "./routers/apiRouter";
import cors from 'cors'
const app = express();

const PORT = 8000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/ping', (req:Request, res:Response)=>{
    res.json({
        "success": true,
        "data": "Pong",
    })
})

app.use('/api',apiRouter);


app.listen(PORT , ()=>{
    console.log(`server is listening at port ${PORT}`);
    connectDB();
})

