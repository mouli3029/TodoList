const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
            if(value.length < 7 || value.toLowerCase().includes('password')){
                throw new Error('Password must be greater than 7 characters')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    todos: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Todo'
        }
]
})

UserSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}

const User = mongoose.model('User',UserSchema);
module.exports = User;