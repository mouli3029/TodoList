const UserRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user')
const auth = require('../middleware/auth')

// LOGIN
UserRouter.post('/users/login',async (req,res)=>{
    const body = req.body;

    const user = await User.findOne({username : body.username})
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = await user.generateAuthToken();
  res.status(200).json({user,token})
})

UserRouter.get('/users/logout',auth,async (req,res) => {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token != req.token
    })
    await req.user.save()
    .then(data=>{
        return res.status(200).send({"message" : "Successfully logged out from the current instance."})
    })
    .catch((err)=>{
        return res.status(400).end();
    })
})

UserRouter.get('/users/logoutAll',auth,async (req,res)=>{
    req.user.tokens = []
    await req.user.save()
    .then(data=>{
        return res.status(200).send({"message" : "Successfully logged out from the all the instances."})
    })
    .catch((err)=>{
        return res.status(400).end();
    })

})

UserRouter.post('/users',async (req,res)=>{
    const body = req.body;
    const hashedPassword =await bcrypt.hash(body.password,10);
    const user = new User({
        ...body,
        password : hashedPassword
    })
    if(!user){
        return res.status(500).send()
    }
    await user.save()
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(400).send(err);
    })
})

UserRouter.get('/users',async (req,res)=>{
    await User.find({}).populate('todos')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).send(err))

})
UserRouter.get('/users/:id',async (req,res)=>{
    await User.findById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

UserRouter.delete('/users/:id',async(req,res)=>{
    await User.findByIdAndRemove(req.params.id)
    .then(user  => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).send()
    })
})

UserRouter.put('/users/:id',async (req,res)=>{
    const body = req.body;
    if(!body){
        return res.status(400).end()
    }
   await User.findByIdAndUpdate(req.params.id,body,{new : true})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(400).send(err);
    })
})



module.exports = UserRouter;