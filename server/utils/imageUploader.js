import {v2 as cloudinary} from 'cloudinary'

export const uploadImageToCloudinary = async(file, folder, height, quality) => {
    const options = {
        folder,
        resource_type : "auto",
        ...(height && {height}),
        ...(quality && {quality})
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

function getPublicIdFromUrl(url){
    const parts = url.split("/")
    const fileName = parts.pop().split(".")[0]
    const versionIndex = parts.findIndex((p)=>/^v\d+$/.test(p))
    const folder = parts.slice(versionIndex+1).join("/")
    return `${folder}/${fileName}`
}

export const deleteFileFromCloudinary = async(fileUrl, folder) => {
    console.log("File Url is", fileUrl)
    console.log("Folder is", folder)
    const options = {
        folder
    }
    const fileId = getPublicIdFromUrl(fileUrl)
    console.log("File id is", fileId)

    await cloudinary.uploader.destroy(fileId, options)

}