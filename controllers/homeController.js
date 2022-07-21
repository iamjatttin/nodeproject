const sendEmail = require('../utils/sendEmail');
exports.homeIndex = async (req, res) => {

        return res.send('Hello World!')
};
exports.uploadFile = async (req, res) => {
    if(!req.file){
        res.json(req.fileValidationError)
    }else{
        res.json(req.file)
    }
};
exports.newChat = async (req, res) => {
    try {
       const result = await sendEmail({
            email:"jatinranjit@gmail.com",
            subject:"NEW MESSAGE",
            message:"<h1>Hello</h1><p>Paragraph</p>",
        });
        console.log(result.body.Messages[0].Status)
        res.status(200).json(result.body);

    } catch (error) {
        console.log(error)
    }
    // console.log(process.env.MONGO_URI)
        // return res.send('Hello World!')
};