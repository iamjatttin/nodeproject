const express = require('express');
const router = express();

const {upload} = require("../middlewares/uploadFiles")
const { isAuthenticated } = require('../middlewares/auth');
const { newChat,homeIndex,uploadFile } = require('../controllers/homeController');
const { signupUser,loginUser,getUser,getallUser,getallquestions,updatescore } = require('../controllers/userController');

// User Routes(inside userController)
    router.route("/api/create").post(signupUser);
    router.route("/api/login").post(loginUser);
    router.route("/api/profile").post(isAuthenticated,getUser);
    router.route("/api/updatescore").post(isAuthenticated,updatescore);
    router.route("/api/getalluser").post(getallUser);
    router.route("/api/getallquestions").post(getallquestions);
    
// 
    router.route("/api/").get(homeIndex);
    router.route("/api/upload").post( upload.single('avatar'),uploadFile);
    router.route("/api/newchat").get(newChat);

module.exports = router;