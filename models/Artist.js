const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    artist_name: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 25,
      get: name => {
        return name.split(" ").map(el => el[0].toUpperCase()+el.slice(1)).join(" ");
      }
    },
    artist_dob: {
      type: Date,
      default: Date.now,
      required: true
    },
    artist_bio: {
      type: String
    },
    versionKey: false
  },
  {
    collection: "artists"
  }
);
ArtistSchema.index({ artist_name: 1, artist_dob: 1 }, { unique: true });

module.exports = Artist = mongoose.model("artist", ArtistSchema);
