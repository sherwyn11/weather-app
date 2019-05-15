const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const request = require('request')
const app = express()

//defining paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup for static files
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sherwyn'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Sherwyn'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Sherwyn',
        message: "I'm here to help"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide a location! "
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: "Unable to find location! Try another search"
            })
        }
        
        forecast(latitude,longitude, (error, data) => {
            if(error){
                return res.send({
                    error: "Unable to find location! Try another search"
                })
            }
            res.send({
                forecast:data.summary + " Temperature is " + data.temperature + " degrees Celsius. There is "+data.Rainprobability + "% chance of rain.",
                location: location,
                address: req.query.address
            })  
        })
    })
    console.log(req.query.address)
      
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
       name: 'Sherwyn',
       errortype: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        name: 'Sherwyn',
        errortype: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log("Sever is up on port 3000")
})