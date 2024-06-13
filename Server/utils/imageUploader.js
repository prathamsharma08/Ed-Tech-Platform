const cloudinary=require("cloudinary");
exports.uplaodImageToCloudinary=async(file,folder,height,quality)=>{
    const options={folder};
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
return await cloudinary.UploadStream.upload(file.tempFilePath,options);
}