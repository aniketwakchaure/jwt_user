const express = require('express')
/*uses:
1.Creating a server => listen with the port no
2.Routing of API =
3.Configuring Middlewares => .use => body-parser,morgan,router
*/
const logger = require('morgan')

const bodyParser = require('body-parser')
const app = express()
const userRoute = require('./app/api/routes/users')
const movieRoute = require('./app/api/routes/movies')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
/*
uses:
1.Verify
*/
app.set('secretKey','hdjsakfhdjsk')
const userValidation = (req, res,next) => {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err
            })
        }
        next()
    })
}
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/user',userRoute)

app.use('/movie',userValidation, movieRoute)


app.get('/', (req,res) => {
    res.json({
        "APP": "JWT Based API Application",
        "message": "Successfully Running the Application"
    })
})

const mongoURI = "mongodb+srv://arjunuvlad:arjun123@hitman24.ct1jy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
.then(() => {
    console.log("Successfully Connected to the Database")
})
.catch((err) => {
    console.log(err)
})

app.listen(5000,() => {
    console.log("Successfully Running on the PORT: 5000")
})