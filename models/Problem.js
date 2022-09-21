const mongoose = require('mongoose');

const ProblemSchema = mongoose.Schema({
    questionNumber: {
        type: Number,
        require: false
    },
    question: {
        type: String,
        require: false
    },
    answers: {
        type: Array,
        require: false
    },
    correctAnswer: {
        type: Number,
        require: false
    },
    imageSrc: {
        type: String,
        require: false
    }
})
module.exports = mongoose.model('Problem', ProblemSchema)