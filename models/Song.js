const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    song_name: {
      type: String,
      lowercase: true,
      maxlength: 30,
      required: true,
      get: name => {
        return name
          .split(" ")
          .map(el => el[0].toUpperCase() + el.slice(1))
          .join(" ");
      }
    },
    song_artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist"
      }
    ],
    user_ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          sparse: true
        },
        rating: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          default: 1
        },
        _id: false
      }
    ],
    avg_rating: {
      type: mongoose.Decimal128,
      get: function() {
        if (this.user_ratings) {
          const count = this.user_ratings.length;
          if (count === 0) return 0;
          let sum = 0;
          this.user_ratings.forEach(element => {
            sum += element.rating;
          });
          const result = (sum / count).toFixed(2);
          return Number(result);
        }
        return 0;
      },
      set: function(num){
        if (this.user_ratings) {
          const count = this.user_ratings.length;
          if (count === 0) return 0;
          let sum = 0;
          this.user_ratings.forEach(element => {
            sum += element.rating;
          });
          const result = (sum / count).toFixed(2);
          return Number(result);
        }
        return 0;
      },
      default: 5,
      max: 5,
      min: 1
    },
    song_album: {
      type: String,
      default: () => this.song_name
    },
    song_releasedate: {
      type: Date,
      default: Date.now
    },
    song_cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image"
    }
  },
  {
    collection: "songs"
  }
);
SongSchema.index({ song_name: 1, song_releasedate: 1 }, { unique: true });
module.exports = Song = mongoose.model("song", SongSchema);
