const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

//Middleware for accepting body data from HTTP request
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routing
app.use('/api/goals', require('./routes/goalRoutes'))

//Custom Middlewares
app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))