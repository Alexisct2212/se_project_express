const mongoose = require("mongoose");
const validator = require('validator');
const user = require("./user");

const clothingSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  weather:{
    type:String,
    required:[true,"weather type required"],
    enum:['hot','warm','cold']
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:user,
    required:true
  },
  likes:{
    type:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    default:[]
  },
  createdAt:{
    type:Date,
    default:Date.now,
    required:true
  }

});

module.exports = mongoose.model("clothing",clothingSchema)