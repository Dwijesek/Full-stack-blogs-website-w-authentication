const mongoose = require('mongoose')
const User = require('../model/users')
const users ={}

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
    res.json({mssg:'User logged in'})
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}

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
   res.status(200).json({email, user})
 }
 catch(error){
   res.status(400).json({error:error.message})
 }
}

module.exports = users