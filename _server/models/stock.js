const mongoose = require(`mongoose`)

let stockSchema = new mongoose.Schema(
   {
        _id: {type: Number},
        stock:{type: Number},
        times_sold:{type:Number}
   },
   {
       collection: `stock`
   })

module.exports = mongoose.model(`stock`, stockSchema)



