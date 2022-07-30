const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please enter Question"]
    },
    options: [{
        type: String
    }],
    correct: {
        type: String,
    },
});

module.exports = mongoose.model("Question", questionSchema);