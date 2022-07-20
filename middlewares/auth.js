const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    // const { token } = req.cookies;
    const token = req.header('token');

    if(!token) {
        res.status(401).send({ error: "Please authenticate using a valid token {Message from Middleware no token}" })
    }
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token {Message from Middleware wrong token}" })
    }
    
};