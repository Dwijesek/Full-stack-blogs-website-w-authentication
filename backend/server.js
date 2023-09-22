const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const mainRoutes = require('./router/main')
const userRoutes = require('./router/users')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/user', userRoutes)
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
