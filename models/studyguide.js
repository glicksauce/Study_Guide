const mongoose = require('mongoose')
const Schema = mongoose.Schema

//https://mongoosejs.com/docs/subdocs.html

const questionSchema = new mongoose.Schema({
    question: String,
    answers: Array,
    correct_answer: Number
})


const guideSchema = new mongoose.Schema({
    guide_name: String,
    description: String,
    guide_data: [questionSchema],
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Person'}],
    public: Boolean
})


const Guide = mongoose.model('Guide', guideSchema)
const Question = mongoose.model('Question', questionSchema)

module.exports = Guide
