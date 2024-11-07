const express = require('express')
const path = require('path')
const hbs = require('hbs')

// const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname) // __filename

const app = express()

// Used for Dynamic Page Templating
const templatesDirPathV = path.join(__dirname, '../templates/views');
const templatesDirPathP = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs')
app.set('views', templatesDirPathV)
hbs.registerPartials(templatesDirPathP)

// Used for Static display
const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath))


// '' treated as the root of the url
app.get('', (req, res) => {
    // res.send('<h2>Hello Express!</h2>') // Displays in Static mode

    res.render('index', {
        title: 'Weather App',
        name: 'David Danquah'
    }) // Displays in Dynamic mode because of handle bars templating
})
app.get('/help', (req, res) => {
    /* res.send([{
        name: "David",
        age: 36
    }, {
        name: 'Olivia',
        age: 26
    }]) */ // Json: Express automatically detects & stringify
    
    res.render('help', {
        message: 'This is your trusted source for all Weather updates..',
        title: 'Help',
        name: 'David Danquah'
    }) // Displays in Dynamic mode because of handle bars templating
})
app.get('/about', (req, res) => {
    // res.send('<h1>About page!</h1>')
    
    res.render('about', {
        title: 'About Me',
        name: 'David Danquah'
    }) // Displays in Dynamic mode because of handle bars templating
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ // return here because, response cannot be set/sent twice
            'error': 'You need to provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(longitude, latitude, (error, fcData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: fcData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send('Weather page!')
    /* res.send({
        forecast: 'It is snowing',
        location: "Philadelphia",
        address: req.query.address
    }) */
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({ // return here because, response cannot be set/sent twice
            'error': 'You must provide a search request'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Danquah',
        message: 'Help article not be found!'
    })
})

app.get('*', (req, res) => { // Must come after all declared pages. If you got here, that means a page could not be found. The URL could be in sub-paths eg. app.get('/about/*', ()=>{}) but must always come before app.get('*', ()=>{})
    // res.send('404, page could not be found!')

    res.render('404', {
        title: '404',
        name: 'David Danquah',
        message: 'Page could not be found!'
    })
})

// This is synchronous
app.listen(3000, () => {
    console.log('Server is up on port 3000') // This displays not in the browser
}) // On the local machine Port 3000 is standard. HTTP sometimes uses Port 80

// When listen starts it doesn't close (always listening) until manually closed ctrl c