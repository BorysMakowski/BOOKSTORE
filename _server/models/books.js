const mongoose = require(`mongoose`)

let booksSchema = new mongoose.Schema(
   {
        _id: {type: Number},
        price: {type: Number},
        title: {type: String},
        isbn: {type: String},
        pageCount: {type: Number},
        publishedDate: {type: Date},
        thumbnailUrl: {type: String},
        shortDescription: {type: String},
        longDescription: {type: String},
        status: {type: String},
        authors: {type: Array},
        categories: {type: Array}

   },
   {
       collection: `books`
   })

module.exports = mongoose.model(`books`, booksSchema)



