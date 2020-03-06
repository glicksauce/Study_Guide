const mongoose = require('mongoose')

const guideSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
})

const Guide = mongoose.model('Guide', guideSchema)

module.exports = Guide;