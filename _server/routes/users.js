const jwt = require('jsonwebtoken')
const router = require(`express`).Router()

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs');  // needed for password encryption



router.post(`/users/register/:name/:email/:password`, (req,res) => 
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (uniqueError, uniqueData) => 
    {
        if(uniqueData)
        {
            res.json({errorMessage:`User already exists`})
        }
        else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
            {
                usersModel.create({name:req.params.name,email:req.params.email,password:hash}, (error, data) => 
                {
                    if(data)
                    {
                        req.session.user = {email: data.email, accessLevel:data.accessLevel}
                        res.json({name: data.name, accessLevel:data.accessLevel})
                    }
                    else
                    {
                        res.json({errorMessage:`User was not registered`})
                    }
                }) 
            })
        }
    })         
})
 

router.post(`/users/login/:email/:password`, (req,res) => 
{
    usersModel.findOne({email:req.params.email}, (error, data) => 
    {
        if(data)
        {
            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    req.session.user = {email: data.email, accessLevel:data.accessLevel}
                    const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})
                    res.json({name: data.name, accessLevel:data.accessLevel, token:token})
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        } 
    })
})


router.post(`/users/logout`, (req,res) => 
{       
    req.session.destroy()
    res.json({})
})


module.exports = router