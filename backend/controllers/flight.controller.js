import FlightModel from "../models/flight.model.js";

const flightController = {
    createFlight: async (req, res) => {
        try {
            const { name, flightNumber, locationFrom, locationTo, flightDate } = req.body;
            const newFlight = new FlightModel({ name, flightNumber, locationFrom, locationTo, flightDate });
            await newFlight.save();
            res.status(201).json({ success: true, message: 'Flight created successfully', flight: newFlight });
        } catch (error) {
            console.error('Error creating flight:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getAllFlights: async (req, res) => {
        try {
            const flights = await FlightModel.find();
            res.status(200).json({ success: true, flights });
        } catch (error) {
            console.error('Error getting flights:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getFlightById: async (req, res) => {
        try {
            const flight = await FlightModel.findById(req.params.id);
            if (!flight) {
                return res.status(404).json({ success: false, message: 'Flight not found' });
            }
            res.status(200).json({ success: true, flight });
        } catch (error) {
            console.error('Error getting flight by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    updateFlightById: async (req, res) => {
        try {
            const { name, flightNumber, locationFrom, locationTo, flightDate } = req.body;
            const updatedFlight = await FlightModel.findByIdAndUpdate(req.params.id, { name, flightNumber, locationFrom, locationTo, flightDate }, { new: true });
            if (!updatedFlight) {
                return res.status(404).json({ success: false, message: 'Flight not found' });
            }
            res.status(200).json({ success: true, message: 'Flight updated successfully', flight: updatedFlight });
        } catch (error) {
            console.error('Error updating flight by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    deleteFlightById: async (req, res) => {
        try {
            const deletedFlight = await FlightModel.findByIdAndDelete(req.params.id);
            if (!deletedFlight) {
                return res.status(404).json({ success: false, message: 'Flight not found' });
            }
            res.status(200).json({ success: true, message: 'Flight deleted successfully', flight: deletedFlight });
        } catch (error) {
            console.error('Error deleting flight by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    createFlightAndAssociateWithAirports: async (req, res) => {
        try {
            const { name, flightNumber, locationFrom, locationTo, flightDate } = req.body;
            const { adminId } = req.user; 

            const flight = new FlightModel({
                name,
                flightNumber,
                locationFrom,
                locationTo,
                flightDate,
                admin: adminId
            });

            await flight.save();

            const originAirport = await AirportModel.findById(locationFrom);
            originAirport.flights.push(flight._id);
            await originAirport.save();

            const destinationAirport = await AirportModel.findById(locationTo);
            destinationAirport.flights.push(flight._id);
            await destinationAirport.save();

            res.status(201).json({ message: 'Flight created successfully' });
        } catch (error) {
            console.error('Error creating flight:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
export default flightController