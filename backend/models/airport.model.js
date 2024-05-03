import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    flights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flight'
    }]
});


const AirportModel = mongoose.model('Airport', airportSchema);



export default AirportModel