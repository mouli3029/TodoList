const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').substring(7);
        const decoded = jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }
    catch(e){
        console.log(e);
        res.status(401).send({error : "Please authenticate"})
    }
}
module.exports  = auth