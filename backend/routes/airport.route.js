import express from 'express';
const router = express.Router();
import airportController from '../controllers/airport.controller.js';


router.use(express.json());




router.route('/')
    .get(airportController.getAllAirports)
    .post(airportController.createAirport);


router.route('/:id')
    .get(airportController.getAirportById)
    .put(airportController.updateAirportById)
    .delete(airportController.deleteAirportById);



export default router;