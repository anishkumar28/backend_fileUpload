const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {
        // fetch file from request
        const file = req.files.file;
        console.log("File arrived", file);

        // create path where file need to stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path is ", path);

        // add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        // create a successfull response
        res.json({
            success:true,
            message: 'Local File uploaded successfully'
        });

    } catch (error){
        console.log(error);
    }
}


function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async (req, res) => {
    try{
        // data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // Validation of data
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // check file type
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            });
        }

        const response = await uploadFileToCloudinary(file, "Anish");
        console.log(response);

        // save entry to database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message: "Image uploaded successfully",
        });

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        })
    }
}



exports.videoUpload = async (req, res) => {
    try{
        // data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

        // Validation of data
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type :", fileType);

        // check file type
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            });
        }

        const response = await uploadFileToCloudinary(file, "Anish");
        console.log(response);

        // save entry to database
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,

        });

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message: "Video uploaded successfully",
        });


    } catch(error) {
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        })
    }
}







exports.imageSizeReducer = async (req, res) => {
    try{
        // data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;

        // Validation of data
        const supportedTypes = ["jpg","jpeg","png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type :", fileType);

        // check file type
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            });
        }

        const response = await uploadFileToCloudinary(file, "Anish", 30);
        console.log(response);

        // save entry to database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message: "Image uploaded successfully",
        });


    } catch(error) {
        res.status(400).json({
            success:false,
            message: "Something went wrong",
        })
    }

}