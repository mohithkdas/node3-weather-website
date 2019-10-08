const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HandleBars and view location
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohith Das'
    })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send({error:"No address provided"})
}

geocode(req.query.address, (error, /*data*/{ latitude, longitude, location } = {}) => {
    if (error) { return res.send({error : error}) }
    let mapLOC = location//data.location
    forecast(/*data.latitude, data.longitude*/latitude, longitude, (geoError, geoData) => {
        if (geoError) { return console.log({error: geoError}) }
        res.send({forecast: geoData,
        location :  mapLOC,
        address: req.query.address })


    })

})




// res.send({
//     obj:"Req Object",
//     city: req.query.address})

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Moe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page HBS',
        name: 'Mohith K Das'

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send(
        {
            products:[]
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help Article not found"
    })
})

app.get('*', (req, res) => {
    //res.send("My 404 Page")
    res.render('404', {
        errorMessage: "Page not found"

    })
})



app.listen(port, () => {
    console.log('Server is up on port: '+port)
})


app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>')
})

// app.get('/help', (req, res) => {
// res.send('Help Page')
// })

// app.get('/about', (req, res) => {
//     res.send('About Page \n <h1>Title</h1>')
//     })

// app.get('/weather', (req, res) => {
//         res.send({
//             forecast: 'It is Snowing',
//             location: 'Jammu'
//         })
//         })
