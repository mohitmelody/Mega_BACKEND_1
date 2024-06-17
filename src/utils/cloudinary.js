import { v2 as cloudinary } from " cloudianry"
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilePath) => {
    try {
        if (!localfilePath) return null
        //upload file on cloudinary 
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        })
        console.log("file upload successfully on cloudinary ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localfilePath) // remove temporary saved file by user end
        return null
    }
}

cloudinary.v2.uploader.upload("",
    { public_id: "" },
    function (error, result) { console.log(result); })
    export {uploadOnCloudinary}