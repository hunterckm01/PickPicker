import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  studioName: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true, // IT REMOVES THE WHITESPACE
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AdditionalDetails",
  },
  accountType: {
    type: String,
    enum: ["Admin", "Photographer"],
    default: "Photographer",
    required: true,
  },
  galleryID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
  ],
  clientID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  token: {
    type: String,
  },
  
});

const User = mongoose.model("User", userSchema)
export default User ;