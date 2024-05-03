import { connect } from "mongoose";

const connectDB =  (URI) => {
    connect(URI).then(() => {
            console.log('database connected .........')
        }).catch((err) => {
            console.log('database not connected ')
        })
}


export default connectDB