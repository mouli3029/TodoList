const express = require('express');
const Todo = require('../models/todo');
const Router = express.Router();

Router.get('/todos', (req, res) => {
    res.send("Todo sent")
})

Router.post('/todos', (req, res) => {
    const todo = new Todo(req.body);

    if (!todo) {
        return res.status(400).send({ error: "Please provide the todo" })
    }
    todo.save()
        .then((result) =>{
            res.status(201).json(result)
        })
        .catch((err) => console.log(err))

})

//mongodb+srv://todo:mouli1234@cluster0.96osm.mongodb.net/test

module.exports = Router