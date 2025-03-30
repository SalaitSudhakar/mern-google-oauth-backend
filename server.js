import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Database/config.js';
import userRoute from './Routes/userRoute.js';
import authRoute from './Routes/authRoute.js';

dotenv.config();

const app = express();

const port =  process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to my API")
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute);


connectDb();

app.listen(port, () => {
    console.log("Server is started and running on the port")
})
