const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mainSchema = new Schema({
  title:{
    type: String,
    required:true
  },
  body:{
    type:String,
    required: true
  },
  Author:{
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('MainData', mainSchema )

