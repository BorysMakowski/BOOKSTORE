const router = require(`express`).Router()

const booksModel = require(`../models/books`)


// read all records
router.get(`/books`, (req, res) => 
{   
    //user does not have to be logged in to see car details
    booksModel.find((error, data) => 
    {
        res.json(data)
    })
})

/*
// Read one record
router.get(`/books/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        booksModel.findById(req.params.id, (error, data) => 
        {
            res.json(data)
        })
    }
*/
// Read one record no login
router.get(`/books/:id`, (req, res) => 
{
    {
        booksModel.findById(req.params.id, (error, data) => 
        {
            res.json(data)
        })
    }
})


// Add new record
router.post(`/books`, (req, res) => 
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

            booksModel.create(req.body, (error, data) => 
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
router.put(`/books/:id`, (req, res) => 
{
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        booksModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
        {
            res.json(data)
        })        
    }
})


// Delete one record
router.delete(`/books/:id`, (req, res) => 
{
    console.log(req.params.id)
    if(typeof req.session.user === `undefined`)
    {
        res.json({errorMessage:`User is not logged in`})
    }
    else
    {
        if(req.session.user.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
        {
            booksModel.findByIdAndRemove(req.params.id, (error, data) => 
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

