import mongoose from "mongoose";


const flightSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flightNumber: {
        type: Number,
        required: true
    },
    locationFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'airport'
    },
    locationTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'airport'
    },
    flightDate: {
        type: String,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const FlightModel = mongoose.model('Flight', flightSchema);

export default FlightModel