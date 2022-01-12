const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)


const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    const d = new Date();

    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.bookid = req.params._id
    saleDetails.price = req.params.price
    saleDetails.customerName = req.params.customerName
    saleDetails.customerEmail = req.params.customerEmail
    saleDetails.date = d.getDate()

        
    carsModel.findByIdAndUpdate({_id:req.params._id}, {sold: true}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
    }) 
    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }                        
    })   
    
    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:carID/:price/:customerName/:customerEmail', createNewSaleDocument)


module.exports = router