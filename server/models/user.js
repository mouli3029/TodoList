const mongoose = require('mongoose');
const validator = require('validator')
const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength: 3,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
    },
    email : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    age : {
        type : String,
        default : 0
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if(value.length < 7 || value.toLowerCase().contains('password')){
                throw new Error('Password must be greater than 7 characters')
            }
        }
    },

})

const User = mongoose.model('User',UserSchema);
module.exports = User;