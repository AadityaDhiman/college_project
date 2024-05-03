import express from 'express';
import mongoose from 'mongoose';
const router = express.Router()

const db = mongoose.connection

const url = 'https://api.aviationstack.com/v1/routes'

async function seedData() {
    try {
        const response = await fetch('http://api.aviationstack.com/v1/countries?access_key=4c67f9816d36e04be926533e800be1df');

        const data = await response.json();
        
        const dataa =  await db.collection('countriesData').insertMany([data])
        console.log("seeded success")
        
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}


router.get('/seed-data', (req, res) => {
    seedData();
    res.send('Seeding data to database...');
});

export default router