const router = require(`express`).Router()

const stockModel = require(`../models/stock`)

let compareByTimesSold = (a,b) =>{
    if(a.times_sold > b.times_sold)
        return -1
    if(a.times_sold < b.times_sold)
        return 1
    return 0
}

// read all records
router.get(`/stock`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    stockModel.find((error, data) => 
    {
        res.json(data)
    })
})

// read all records and sort by times sold
router.get(`/stock/bestsellers`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    stockModel.find((error, data) => 
    {
        data.sort(compareByTimesSold)
        res.json(data)
    })
})

// Read one record
router.get(`/stock/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        stockModel.findById(req.params.id, (error, data) => 
        {
            res.json(data)
        })
    }
})


// Add new record
router.post(`/stock`, (req, res) => 
{
    console.log(req.headers.authorization)
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel !== `undefined` && req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {

            stockModel.create(req.body, (error, data) => 
            {
                res.json(data)
            })
        }
        else
        {
            res.json({errorMessage:`User is not an administrator, so they cannot add new records`})
        }
    }
})


// Update one record
router.put(`/stock/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        stockModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
        {
            res.json(data)
        })        
    }
})


// Delete one record
router.delete(`/stock/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            stockModel.findByIdAndRemove(req.params.id, (error, data) => 
            {
                res.json(data)
            })
        }
        else
        {
            res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
        }        
    }
})

module.exports = router

