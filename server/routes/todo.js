const express = require('express');
const Todo = require('../models/todo');
const User = require('../models/user');
const TodoRouter = express.Router();
const auth = require('../middleware/auth');

TodoRouter.get('/todos',auth,async(req, res) => {
    await Todo.find({user:req.user._id})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
})

TodoRouter.post('/todos',auth,async (req, res) => {
    const body = req.body;
    const user = await User.findById(req.user._id)
    if(!body){
        return res.status(400).end()
    }
    console.log(body,user);
    const todo = new Todo({
        ...body,
        user : user._id,
    });
    console.log(todo)
    await todo.save()
        .then((data) =>{
            res.status(201).json(data)
        })
        .catch((err) => {
            return res.status(500).send(err);
        })

    user.todos = user.todos.concat(todo._id);
    await user.save();
})


TodoRouter.get('/todos/:id',auth,async (req,res)=>{
    const _id = req.params.id;
    await Todo.findOne({_id,user:req.user._id})
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

TodoRouter.put('/todos/:id',auth,async (req,res)=>{
    const body = req.body;
    if(!req.user){
        return res.status(400).end()
    }
   await Todo.findByIdAndUpdate(req.params.id,body,{new : true})
    .then(todo => {
        res.status(201).json(todo)
    })
    .catch(err => {
        res.status(400).send(err);
    })
})
TodoRouter.delete('/todos/:id',auth,async (req,res)=>{
    if(!req.user){
        return res.status(400).end()
    }
    await Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch(err => {
        res.status(400).send(err);
    })
})


//mongodb+srv://todo:mouli1234@cluster0.96osm.mongodb.net/test

module.exports = TodoRouter