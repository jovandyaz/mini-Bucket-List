const express = require( 'express' )
const router = express.Router()
const  wonders = require('../wonders')

router.get('/wonders', function (req, res) {
    console.log(wonders)
    res.send(wonders)
})

router.post('/wonder', function (req, res) {
    console.log("Someone's trying to make a post request")
    // Spot-Check 1 - code here...
    wonders.push({ ...req.body, visited: false })
    let wonder = req.body.name
    console.log(wonder)
    res.send(`completed adding ${wonder}`)
})

// Spot-Check 2 - code here...

router.put('/wonder/:name', function (req, res) {
    console.log("PUT works")
    wonder = req.params.name
    wonders.find(w => w.name === wonder).visited = true //syntaxis object
    console.log(wonder)
    res.send(`${wonder} is visited`)
})
// Spot-Check 3 - code here...

router.delete('/wonder/:name', function (req, res) {
    console.log("DELETE works")
    wonderD = req.params.name
    let indW = wonders.findIndex(w => w.name == wonderD)
    wonders.splice(indW, 1)
    res.send(`${wonderD} is deleted`)
})


module.exports = router
