import mongoose from "mongoose";

const additionalDetailsSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    dateOfBirth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    }
})

const AdditionalDetails = mongoose.model("AdditionalDetails", additionalDetailsSchema)

export default AdditionalDetails ;