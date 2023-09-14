const mongoose = require('mongoose')
const MainData = require('../model/main')
const controllers ={}

controllers.getAll = async (req, res) =>{
  try{
    const allBlogs = await MainData.find({}).sort({createdAt:-1})
    res.status(200).json(allBlogs)
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}

controllers.getOne = async (req, res) =>{
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"Id is not valid"})
  }
  try{
    const blog = await MainData.findById(id)
    if(!blog){
      return res.status(400).json({error:"Not Found"})
    }
    res.status(200).json(blog)
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}

controllers.createOne = (req, res) =>{
  const { title , body, author } = req.body
  console.log(title, body, author)
  
  res.status(200).json({message:"Successful...."})
}

controllers.deleteOne = (req, res) =>{
  res.status(200).json({message:"Successful...."})
}

module.exports = controllers