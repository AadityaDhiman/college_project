import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000;
import os from 'os'
const cpusNum = os.cpus().length;
import cors from 'cors'
import UserRouter from './routes/user.route.js'
import connectDB from './connection/conn.js';
import FlightRouter from './routes/flights.route.js'
import AirportRouter from './routes/airport.route.js'
import mongoose from 'mongoose';


app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))


app.use("/api/users", UserRouter)
app.use("/api/flights", FlightRouter)
app.use("/api/airports", AirportRouter)



const serverStart = async () => {
    try {
        app.listen(PORT, () => {
            console.log('listening on port =>  ' + PORT);
        });
         connectDB(process.env.MONGODB_URI);
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

const graceFullShutdown = async () => {
    console.log('Shutting down the server process id => ' + process.pid);
    try {
        await mongoose.connection.close();
        console.log('connection closed successfully');
    } catch (error) {
        console.log('Error is coming so error closing the mongodb connection ' + error.message);

    }
    process.exit(0);
}

process.on('SIGTERM', graceFullShutdown);
process.on('SIGINT', graceFullShutdown);

serverStart()






