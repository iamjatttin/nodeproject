exports.newChat = (req, res) => {
    console.log(process.env.MONGO_URI)
    return res.send('Hello World!')
   
};