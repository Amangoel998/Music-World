const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artists: [
    {
      artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist"
      }
    }
  ],
  ratings: [
    {
      stars: {
        type: Number,
        enum: [1,2,3,4,5],
        default: 3
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  album: {
    type: String,
    required: true
  },
  releasedate: {
    type: Date,
    default: Date.now,
    max: Date.now
  },
  cover: {
    data: Buffer,
    contentType: String
  },
  genre: {
    type: [String]
  }
});
module.exports = Song = mongoose.model("song", SongSchema);
