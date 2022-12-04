require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const queryRoutes = require('./routes/queries')
var morgan = require('morgan')

// express app
const app = express()

// middleware
app.use(express.json())
// app.use(morgan('combined'));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/query', queryRoutes)
app.use('/api/user', userRoutes)

// app.listen(process.env.PORT, () => {
//   console.log('listening to ', process.env.PORT);
// });

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })