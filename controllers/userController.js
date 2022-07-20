const User = require('../models/userModel');
const sendCookie = require('../utils/sendCookie');

exports.signupUser = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const user = await User.findOne({
        $or: [{ email }]
    });
    if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    const newUser = await User.create({
        name,
        email,
        password
    })

    const token = newUser.generateToken();
    return res.status(201).json({ token: token })

    // sendCookie(newUser, 201, res);
};
exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: email }]
    }).select("+password");

    if (!user) {
        return res.status(401).json({error:"User doesn't exist"});
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({error:"Password doesn't match"});
    }

    const token = user.generateToken();
    return res.status(201).json({ token: token })

    // sendCookie(user, 201, res);
};
exports.getUser = async (req, res) => {

    var user = req.user;

    if (!user) {
        return res.status(401).json({error:"User Not Signedin"});
    }
    var userdetails = await User.findById(user);
    // const token = user.generateToken();
    return res.status(200).json(userdetails)

    // sendCookie(user, 201, res);
};

