import archiver from "archiver"
import axios from "axios"

const streamImagesToZip = async(imageUrls, res, zipFileName = "FavImages,zip") => {
    try{
        res.setHeader("Content-Disposition", `attachment; filename=${zipFileName}`)
        res.setHeader("Content-Type", "application/zip")

        const archive = archiver("zip", {zlib: {level: 9}})

        archive.pipe(res)
        console.log("Reached after placing to pipe")
        for(let i = 0; i < imageUrls.length; i++){
            const imageUrl =  imageUrls[i]
            const response = await axios.get(imageUrl, {responseType: "stream"})
            console.log("Could not complete")
            archive.append(response.data, {name: `image_${i+1}.jpg`})
        }

        archive.finalize()
    }
    catch(err){
        throw new Error("Error Zipping and stripping images", err)
    }
}

export default streamImagesToZip;