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

mongoose.connect('mongodb+srv://vidar:Mamail12@cluster0.lqu9b.mongodb.net/shopping-list')

//data schema + model

const productSchema = {
    name: String,
    category: String,
    inShoppingList: Boolean
}

const Product = mongoose.model('Product', productSchema)

//API routes

app.get('/api/products', (req, res) => {
    Product.find().then(products => res.json(products))
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