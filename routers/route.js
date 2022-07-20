const express = require('express');
const router = express();
const { isAuthenticated } = require('../middlewares/auth');
const { newChat } = require('../controllers/homeController');
const { signupUser,loginUser,getUser } = require('../controllers/userController');

// User Routes(inside userController)
router.route("/create").post(signupUser);
router.route("/login").post(loginUser);
router.route("/profile").post(isAuthenticated,getUser);

router.route("/").get(newChat);


module.exports = router;