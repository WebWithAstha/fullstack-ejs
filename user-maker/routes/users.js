const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/user-maker-db')
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  caption:String,
  likes:{
    type:String,
    default:0,
  }
})
module.exports= mongoose.model("users",userSchema)