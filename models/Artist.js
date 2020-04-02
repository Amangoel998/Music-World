const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    artist_name: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 25
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
