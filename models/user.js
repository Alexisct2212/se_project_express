const mongoose = require("mongoose");
const validator = require("validator");
const {isEmail} = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
name: {
  type: String,
  minlength: 2,
  maxlength: 30,
  required: true,
},
avatar: {
  type: String,
  required: [true, "This field is required."],
  validate: {
    validator(value) {
      return validator.isURL(value);
    },
    message: "You must enter a valid URL",
  },
},
email:{
unique:true,
type:String,
required:[true, "this field is required"],
validate:{
  validator(value){
    return validator.isEmail(value)
  },
  message:"You must enter a valid email"
}
},
password:{
  type:String,
  select:false,
  required:true
}
});
userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email '));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(' Incorrect  password'));
          }

          return user; // now user is available
        });
    });
  };

module.exports = mongoose.model("user",userSchema)