const multer = require("multer");
var path = require('path');
    // configure multer for your server folder
var storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        //ensure that this folder already exists in your project directory
        cb(null, "public/uploads");
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        newfilename=file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname);
        cb(null, newfilename)
    }
});

const imageFileFilter = (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { 
        req.fileValidationError = "You can upload only image files";
        return cb(null,false, req.fileValidationError);
    }
    cb(null, true)
};

exports.upload = multer({storage: storage, fileFilter: imageFileFilter})