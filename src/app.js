const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Pankaj Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Pankaj Sharma"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message!',
        title: 'Help',
        name: 'Pankaj Sharma'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Things didn\'t go well'
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

    
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//This 404 page setup needs to be the last route

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj Sharma',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pankaj Sharma',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})