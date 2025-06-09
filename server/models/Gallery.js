import mongoose from "mongoose"

const gallerySchema = new mongoose.Schema({
    galleryName: {
        type: String,
        required: true,
        trim: true
    },
    galleryImagesUrl: [{
        type: String,
        trim: true
    }],
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Client"
    },
    photographerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: "User"
    }

})

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery ;
