const express = require('express');
const router = express();

const {upload} = require("../utils/uploadFiles")

const { isAuthenticated } = require('../middlewares/auth');
const { newChat,homeIndex,uploadFile } = require('../controllers/homeController');
const { signupUser,loginUser,getUser } = require('../controllers/userController');

// User Routes(inside userController)
    router.route("/create").post(signupUser);
    router.route("/login").post(loginUser);
    router.route("/profile").post(isAuthenticated,getUser);
// 
    router.route("/").get(homeIndex);
    router.route("/upload").post( upload.single('avatar'),uploadFile);
    router.route("/newchat").get(newChat);

module.exports = router;