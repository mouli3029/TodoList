const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        unique: true,
    },
    description: {
        type: String,
        minLength: 3,
    },
    completed: {
        type: Boolean,
        default: false
    }

})
TodoSchema.plugin(uniqueValidator);

TodoSchema.set('toJSON',{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Todo', TodoSchema)