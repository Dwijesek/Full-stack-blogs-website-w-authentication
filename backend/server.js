const express = require('express')
const app = express()
const mainRoutes = require('./router/main')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/main', mainRoutes)

app.use((req, res) =>{
  res.status(404).json({ message:'Page Not Found'})
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the DB');
    app.listen(process.env.PORT, () => 
   (console.log(`Server Running on ${process.env.PORT}`)))
  })
