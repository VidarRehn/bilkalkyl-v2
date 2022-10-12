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
    User.find().then(data => res.json(data))
})

app.get('/api/events', (req, res) => {
    User.find({}, {events: 1, name: 1}).then(data => res.json(data))
})

app.get('/api/bookings', (req, res) => {
    User.find({}, {bookings: 1, name: 1}).then(data => res.json(data))
})

app.get('/api/payments', (req, res) => {
    User.find({}, {payments: 1, name: 1}).then(data => res.json(data))
})

app.post('/api/users/:id/bookings', (req, res) => {
    console.log(req.body.$push.bookings.startDate)
    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {
        $push: {
            bookings: {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                comment: req.body.comment
            }
        }
    }).then(data => res.json(data))
})

// bookings: {
//     startDate: req.body.$push.bookings.startDate,
//     endDate: req.body.$push.bookings.endDate,
//     comment: req.body.$push.bookings.comment
// }


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