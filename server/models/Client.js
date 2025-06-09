import mongoose from "mongoose";

const clientSchema = new mongoose.Schema( {
    clientName: {
        type: String,
        trim: true
    },
    clientNumber: {
        type: Number,
        required: true,
        trim: true
    },
    clientImage: {
        type: String,
        required: true 
    },
    photographerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String
    }
})

const Client = mongoose.model("Client", clientSchema)

export default Client