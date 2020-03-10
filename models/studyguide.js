const mongoose = require('mongoose')

//https://mongoosejs.com/docs/subdocs.html

const questionSchema = new mongoose.Schema({
    question: String,
    answers: Array,
    correct_answer: Number
})


const guideSchema = new mongoose.Schema({
    guide_name: String,
    description: String,
    guide_data: [questionSchema]
})


const Guide = mongoose.model('Guide', guideSchema)
const Question = mongoose.model('Question', questionSchema)

module.exports = {Guide,Question}
