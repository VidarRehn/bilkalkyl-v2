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
    name: {type: String, required: true},
    bookings: [{
        startDate: String,
        endDate: String,
        comment: String,
    }],
    events: [{
        eventDate: String,
        mileageBefore: Number,
        mileageAfter: Number,
        distance: Number
    }],
    payments: [{
        paymentDate: String,
        amountPaid: Number,
        comment: String
    }]
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

app.post('/api/users/:id/payments', (req, res) => {
    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {
        $push: {
            payments: {
                paymentDate: req.body.paymentDate,
                amountPaid: req.body.amountPaid,
                comment: req.body.comment
            }
        }
    }).then(data => res.json(data))
})

app.post('/api/users/:id/events', (req, res) => {
    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {
        $push: {
            events: {
                eventDate: req.body.eventDate,
                mileageBefore: req.body.mileageBefore,
                mileageAfter: req.body.mileageAfter,
                distance: req.body.distance
            }
        }
    }).then(data => res.json(data))
})

app.put('/api/users/:name/bookings/:bookingId', (req, res) => {
    User.findOneAndUpdate({name: req.params.name}, {
        $pull: {
            bookings: {_id: mongoose.Types.ObjectId(req.params.bookingId)}
        }
    }).then(data => res.json(data))
})

app.put('/api/users/:name/events/:eventId', (req, res) => {
    User.findOneAndUpdate({name: req.params.name}, {
        $pull: {
            events: {_id: mongoose.Types.ObjectId(req.params.eventId)}
        }
    }).then(data => res.json(data))
})

app.put('/api/users/:name/payments/:paymentId', (req, res) => {
    User.findOneAndUpdate({name: req.params.name}, {
        $pull: {
            payments: {_id: mongoose.Types.ObjectId(req.params.paymentId)}
        }
    }).then(data => res.json(data))
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