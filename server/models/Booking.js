import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    car: {type: ObjectId, ref: "Car", required: true},
    user: {type: ObjectId, ref: "User", required: true},
    owner: {type: ObjectId, ref: "User", required: true},
    pickupDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    status: {type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending"},
    price: {type: Number, required: true},
    withDriver: {type: Boolean, default: false},
    pickupOption: {type: String, enum: ["pickup", "delivery"], default: "pickup"},
    deliveryAddress: {type: String, default: ""}
},{timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking