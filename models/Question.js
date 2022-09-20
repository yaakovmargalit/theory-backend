const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    questionNumber:{
        type:Number,
        require:false
    },
    title: {
        type: String,
        require:false
    },
    description: {
        type: String,
        require:false
    }
})
module.exports = mongoose.model('Question',QuestionSchema)