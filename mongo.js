const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.MONGODB_URI

const connection = mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connected to database successfully..')
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = connection;