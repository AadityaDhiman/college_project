import express from 'express';
import flightController from '../controllers/flight.controller.js'
const router = express.Router();

router.use(express.json())



router.route('/')
    .get(flightController.getAllFlights)
    .post(flightController.createFlight);

    router.route('/:id')
    .get(flightController.getFlightById)
    .put(flightController.updateFlightById)
    .delete(flightController.deleteFlightById);

   
export default router