require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())


//mongoose

mongoose.connect('mongodb+srv://vidar:vidar@cluster0.biajbry.mongodb.net/bilkalkyl')

//data schema + model

const userSchema = {
    name: String,
    category: String,
    inShoppingList: Boolean
}

const User = mongoose.model('User', userSchema)

//API routes

app.get('/api/users', (req, res) => {
    User.find().then(users => res.json(users))
})

app.get('/api/events', (req, res) => {
    User.find({}, {events: 1, name: 1}, 
        (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})


// build/static

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.listen(port, () => {
    console.log(`Express is running on ${port}`)
})