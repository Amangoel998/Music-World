const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    artist_name: {
        type : String,
        required : true
    },
    artist_dob:{
        type: Date,
        default: Date.now,
        required : true
    },
    artist_bio:{
        type: String
    }
});
module.exports = Artist = mongoose.model('artist', ArtistSchema);