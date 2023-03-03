// require packages used in the project
const express = require("express")
const exphbs = require("express-handlebars")
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')


// setting template engine
app.engine('handlebars', exphbs( { defaultLayout: 'main' } ))
app.set('view engine', 'handlebars')

// routes setting
app.use(express.static('public'))

//render Index Page
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})


//render Show Page
app.get('/restaurants/:restaurantId', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurantId)

    res.render('show', { restaurant: restaurant})
})

//search function
    app.get('/search', (req, res) => {
        const keyword = req.query.keyword.trim().toLocaleLowerCase()

        const filterdRestaurants = restaurantList.results.filter(restaurant => {
            return restaurant.name.toLocaleLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
        })
        console.log(filterdRestaurants)
        res.render('index', { restaurants: filterdRestaurants, keyword })
    })

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on  http://localhost:${port}`)
})