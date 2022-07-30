const User = require('../models/userModel');
const Question = require('../models/questionModel');
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
    return res.status(201).json({ token: token,user: newUser })

    // sendCookie(newUser, 201, res);
};
exports.loginUser = async (req, res) => {

    const { userId, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({
        $or: [{ email: userId }]
    }).select("+password");

    if (!user) {
        return res.status(401).json({error:"User doesn't exist"});
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({error:"Password doesn't match"});
    }

    const token = user.generateToken();
    return res.status(201).json({ token: token,user:user })

    // sendCookie(user, 201, res);
};
exports.getUser = async (req, res) => {

    var userid = req.user;

    if (!userid) {
        return res.status(401).json({error:"User Not Signedin"});
    }
        var user = await User.findById(userid);
        console.log(user)
        return res.status(200).json({user:user})

    // sendCookie(user, 201, res);
};
exports.getallUser = async (req, res) => {

        var userdetails = await User.find();
        return res.status(200).json(userdetails)

    // sendCookie(user, 201, res);
};
exports.getallquestions = async (req, res) => {

    var question = await Question.find();
    return res.status(200).json({question})

// sendCookie(user, 201, res);
};
exports.updatescore = async (req, res) => {
    var userid = req.user
    console.log(req.body)
    User.findByIdAndUpdate(userid, { score: req.body.Score },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }})
    var user = await User.findById(userid);
    // console.log(user)
    return res.status(200).json({user:user})
// sendCookie(user, 201, res);
};

