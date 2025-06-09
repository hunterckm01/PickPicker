import Client from "../models/Client.js";
import User from "../models/User.js";
// import { uploadImageToCloudinary } from '../utils/imageUploader.js';
import {sendResponse} from "../utils/sendResponse.js";
import "dotenv/config";
// import await

export async function createClient(req, res) {
  try {
    console.log("Started Client Creationi");
    let { clientName, clientNumber } = req.body;
    
    // Set Image For The Client
    // let customerImage ;
    // console.log("Inside checking client Image")
    // console.log(req.files)

    let customerImage = `https://api.dicebear.com/9.x/initials/svg?radius=10&seed=${clientName}`;

    console.log("Client Name", clientName);
    console.log("Client Number", clientNumber);
    console.log("Client Image", customerImage);

    if (!clientName || !clientNumber || !customerImage) {
      sendResponse(res, 400, false, "Missing Field in Create Customer");
    }

    const userId = req.user.id;
    const photographerDetails = await User.findById(userId);
    console.log("Photographer Details is", photographerDetails);

    if (!photographerDetails) {
      sendResponse(res, 404, false, "Photographer Details Could Not find");
    }

    console.log("After fetching photographer Details");
    //Upload Client Image to Cloudinary
    // const clientImage = await uploadImageToCloudinary(customerImage, process.env.FOLDER_NAME)

    // console.log(clientImage)

    // console.log("Can't get client image")
    // console.log("Client Image is", clientImage)
    // console.log("Reached Here")

    // Checking if client already exist
    const checkClientExist = await Client.findOne({ clientNumber });
    if(checkClientExist) {
      sendResponse(res, 400, false, "Client Already Exist");
      return;
    }
    console.log("Client already exist");

    //Create an Entry for the new customer
    const client = await Client.create({
      clientName,
      clientNumber,
      clientImage: customerImage,
      photographerID: userId,
    });

    console.log("Client Created successfully", client);

    //Add the client to user databse
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          clientID: client._id,
        },
      },
      { new: true }
    );

    sendResponse(res, 201, true, "Client Created Successfully", {
      data: client,
    });
  } catch (err) {
    sendResponse(res, 500, false, "Failed to create Client", {
      error: err.message,
    });
  }
}

export async function updateClient(req, res) {
  try {
    // console.log("Request Body", req.body)
    const { clientId } = req.body;
    const updates = req.body ;

    console.log(updates);
    const client = await Client.findById(clientId)
    console.log("client Data is", client)

    for(const key in updates){
      console.log("Updates is", updates[key])
      client[key] = updates[key]
    }

    await client.save()

    console.log("Client is", client)

    // if (!clientId || !clientName || !clientNumber) {
    //   return sendResponse(res, 200, false, "Missing Field in updating Client", {
    //     error: err.message,
    //   });
    // }

    // Update the Client Data
    // const clientData = await Client.findByIdAndUpdate(
    //   clientId,
    //   { clientName, clientNumber },
    //   { new: true }
    // );

    return sendResponse(res, 200, true, "Client Details Updated Successfully", {
      data: client,
    });
  } catch (err) {
    console.log("Error Occured while Updating Client Details");
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
}

export async function deleteClient(req, res) {
  try {
    console.log("Request get", req.body)
    const { clientId } = req.body;
    console.log("Client id is", clientId)
    const photographerId = req.user?.id;
    const clientDetails = await Client.findById(clientId);

    // console.log("Client Details is", clientDetails)

    if (!clientDetails) {
      sendResponse(res, 400, false, "Could Not find the Client with clientId");
      return;
    }

    // Delete the client Id from Photographer DB
    await User.findByIdAndUpdate(
      photographerId,
      { $pull: { clientID: clientId } },
      { new: true }
    );

    // await User.findByIdAndDelete({clientDetails: clientId})
    console.log("Successfully Deleted the client from Photographer DB");

    await Client.findByIdAndDelete(clientId);

    sendResponse(res, 200, true, "Successfully Deleted the client");
  } catch (err) {
    console.log("Error Occured while deleting the client");
    sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
}

export async function deleteAllClient(req, res) {
  try {
    const photographerId = req.user.id;

    if (!photographerId) {
      return sendResponse(res, 400, false, "Photographer Id Could Not Find");
    }

    const photographer = await User.findById(photographerId);

    if (!photographer) {
      return sendResponse(res, 404, false, "Photographer Could not found");
    }

    const clientIds = photographer?.clientID;
    console.log("Clients Ids are", clientIds);

    photographer.clientID = [];
    await photographer.save();

    console.log("Deleted the user successfully");

    await Client.deleteMany({ _id: { $in: clientIds } });

    return sendResponse(res, 200, true, "All Clients Deleted Successfully");
  } catch (err) {
    console.log("Something went while deleting all the user");
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
}

export async function getAllClient(req, res) {
  try {
    const photographerId = req.user.id;

    if(!photographerId) {
      console.log("Could not get Photographer Id", photographerId);
      return sendResponse(res, 400, false, "Could Not get Photographer Id");
    }

    // Getting All the Clients
    const allClients = await Client.find({ photographerID: photographerId });

    // console.log("All Clients are", allClients)
    return sendResponse(res, 200, true, "Get All Clients Data", {
      allClients
    });
  } catch (err) {
    console.log("Error get while fetching all clients");
    return sendResponse(res, 500, false, "Could Not Get All the clients", {
      error: err.message,
    });
  }
}
