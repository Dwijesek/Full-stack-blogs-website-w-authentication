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

controllers.createOne = async(req, res) =>{
  const { title , body, author } = req.body
  const missing = []
  if(!title){
    missing.push('title')
  }
  if(!body){
    missing.push('body')
  }
  if(!author){
    missing.push('author')
  }
  if(missing > 0){
    return res.status(400).json({error:"Please fill in all fields"})
  }

  try{
    const singleBlog = await MainData.create({title, body, author})
    res.status(200).json(singleBlog)
  }
  catch(error){
    res.status(400).json({message:error.message})
  }  
}

controllers.updateOne = async (req, res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"Id is not valid"})
  }
  try{
    const blog = await MainData.findOneAndUpdate({_id:id}, {...req.body})
    if(!blog){
      return res.status(400).json({error:"Not Found"})
    }
    res.status(200).json(blog)
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}

controllers.deleteOne = async(req, res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"Id is not valid"})
  }
  try{
    const blog = await MainData.findByIdAndDelete(id)
    if(!blog){
      return res.status(400).json({error:"Not Found"})
    }
    res.status(200).json(blog)
  }
  catch(error){
    res.status(400).json({message:error.message})
  }
}

module.exports = controllers