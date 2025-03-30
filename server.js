import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Database/config.js';
import userRoute from './Routes/userRoute.js'
dotenv.config();

const app = express();

const port =  process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("Welcome to my API")
})

app.use("/api/auth", userRoute);


connectDb();

app.listen(port, () => {
    console.log("Server is started and running on the port")
})
