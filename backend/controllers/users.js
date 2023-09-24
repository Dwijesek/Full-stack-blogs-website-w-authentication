//const mongoose = require('mongoose')
const User = require('../model/users')
const jwt = require('jsonwebtoken')

const users ={}

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'})
  
}

users.login = async(req, res) => {
   const{email, password} =req.body;
   const missing = [];

   if(!email){
    missing.push('email')
   }
   if(!password){
    missing.push('password')
   }
   if(missing > 0){
    return res.status(400).json({error:"Please fill in all fields"})
  }

  try{
    const user = await User.login(email, password)
    //create token
    const token =  createToken(user._id)
    res.status(200).json({email, token})
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}


//===================Signup================================================
users.signup = async(req, res) => {
  const{email, password} =req.body;
  const missing = [];

  if(!email){
   missing.push('email')
  }
  if(!password){
   missing.push('password')
  }
  if(missing > 0){
   return res.status(400).json({error:"Please fill in all fields"})
 }

 try{
   const user = await User.signup(email, password)

  // create token
   const token =  createToken(user._id)

   res.status(200).json({email, token})
 }
 catch(error){
   res.status(400).json({error:error.message})
 }
}

module.exports = users