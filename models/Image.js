const mongoose = require('mongoose')
const ImageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
},
{
  collection: 'images'
});
module.exports = User = mongoose.model('image', ImageSchema);
      