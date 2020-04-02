const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    song_name: {
      type: String,
      lowercase: true,
      maxlength: 30,
      required: true
    },
    song_artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist"
      }
    ],
    avg_rating: {
      type: Number,
      default: 0,
      get: () => {
        const count = this.ratings.length;
        if (count === 0) return 0;
        const sum = 0;
        this.ratings.forEach(element => {
          sum += element.stars;
        });
        this.avg_rating = (sum / count).toFixed(2);
        return this.avg_rating;
      },
      set: num => {
        if(!this.ratings)return 0;
        const diff = (num - this.avg_rating) / this.ratings.length;
        return this.avg_rating + diff;
      }
    },
    user_ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          unique: true
        },
        stars: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          default: 1
        },
        _id: false
      }
    ],
    song_album: {
      type: String,
      default: () => this.song_name
    },
    song_releasedate: {
      type: Date,
      default: Date.now
    },
    song_cover: {
      data: Buffer,
      contentType: String
    },
    versionKey: false
  },
  {
    collection: "songs"
  }
);
SongSchema.index({ song_name: 1, song_releasedate: 1 }, { unique: true });
module.exports = Song = mongoose.model("song", SongSchema);
