import mongoose from 'mongoose';
import AirportModel from '../models/airport.model.js';
import FlightModel from '../models/flight.model.js';
const dbd = mongoose.connection


const airportController = {

    createAirport: async (req, res) => {
        try {
            const { name, city, state, country } = req.body;
            const newAirport = new AirportModel({ name, city, state, country });
            await newAirport.save();
            res.status(201).json({ success: true, message: 'Airport created successfully', airport: newAirport });
        } catch (error) {
            console.error('Error creating airport:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // getAllAirports: async (req, res) => {
    //     try {
    //         const airports = await AirportModel.find();
    //         res.status(200).json({ success: true, airports });
    //     } catch (error) {
    //         console.error('Error getting airports:', error);
    //         res.status(500).json({ success: false, message: 'Internal server error' });
    //     }
    // },

    getAllAirports: async (req, res) => {
        try {
            const airports = await dbd.collection('airportData').find({}).toArray();
            const airportsData = airports[0].data
            res.status(200).json({ success: true, message: "Success", airportsData })
        } catch (error) {
            console.error('Error getting airports:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    getAirportById: async (req, res) => {
        try {
            const airport = await AirportModel.findById(req.params.id);
            if (!airport) {
                return res.status(404).json({ success: false, message: 'Airport not found' });
            }
            res.status(200).json({ success: true, airport });
        } catch (error) {
            console.error('Error getting airport by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    updateAirportById: async (req, res) => {
        try {
            const { name, city, state, country } = req.body;
            const updatedAirport = await AirportModel.findByIdAndUpdate(req.params.id, { name, city, state, country }, { new: true });
            if (!updatedAirport) {
                return res.status(404).json({ success: false, message: 'Airport not found' });
            }
            res.status(200).json({ success: true, message: 'Airport updated successfully', airport: updatedAirport });
        } catch (error) {
            console.error('Error updating airport by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    deleteAirportById: async (req, res) => {
        try {
            const deletedAirport = await AirportModel.findByIdAndDelete(req.params.id);
            if (!deletedAirport) {
                return res.status(404).json({ success: false, message: 'Airport not found' });
            }
            await FlightModel.updateMany({ $or: [{ locationFrom: req.params.id }, { locationTo: req.params.id }] }, { $unset: { locationFrom: '', locationTo: '' } });
            res.status(200).json({ success: true, message: 'Airport deleted successfully', airport: deletedAirport });
        } catch (error) {
            console.error('Error deleting airport by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    addFlightToAirport: async (req, res) => {
        try {
            const { flightId } = req.body;
            const airport = await AirportModel.findById(req.params.id);
            if (!airport) {
                return res.status(404).json({ success: false, message: 'Airport not found' });
            }
            airport.flights.push(flightId);
            await airport.save();
            res.status(200).json({ success: true, message: 'Flight added to airport successfully', airport });
        } catch (error) {
            console.error('Error adding flight to airport:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

export default airportController