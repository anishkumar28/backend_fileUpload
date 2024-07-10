const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
});

fileSchema.post("save", async function(doc){
    try{
        console.log(doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `100xDev by Anish`,
            to: doc.email,
            subjects: "New file uploaded in Cloudinary",
            html: `<h2>Hello Jee</h2> <p>File uploaded. View here: <a href="${doc.imageUrl}"> ${doc.imageUrl} </a></p>`,
        });

        console.log("Info :", info);

    } catch(error){
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);


module.exports = File;