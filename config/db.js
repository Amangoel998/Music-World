const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const User = require("../models/User");
const Image = require("../models/Image");
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected....");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const createUser = async newuser => {
  let msg = "";
  let user = await User.findOne(
    { user_email: newuser.user_email },
    (err, user) => {
      if (err) msg = err.message;
      if (user) msg = "User Already Exists";
    }
  );
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  }
  user = new User(newuser);
  const salt = await bcrypt.genSalt();
  user.user_password = await bcrypt.hash(newuser.user_password, salt);
  await user.save((err, res) => {
    if (err) msg = err.message;
  });
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  } else {
    const payload = {
      user: {
        id: user.id
      }
    };
    return payload;
  }
};

const loginUser = async candidate => {
  let msg = "";
  const user = await User.findOne(
    { user_email: candidate.user_email },
    (err, user) => {
      if (err) msg = err.message;
      if (!user) msg = "Invalid Credentials";
    }
  );
  if (msg || !user) {
    const payload = {
      error: msg
    };
    return payload;
  }
  const isMatch = await bcrypt.compare(
    candidate.user_password,
    user.user_password
  );
  if (!isMatch) {
    const payload = {
      error: "Invalid Credentials"
    };
    return payload;
  }
  const payload = {
    user: {
      id: user.id
    }
  };
  return payload;
};

const createArtist = async newartist => {
  let msg = null;
  let artist = await Artist.findOne(
    {
      artist_name: newartist.artist_name,
      artist_dob: newartist.artist_dob
    },
    (err, res) => {
      if (err) msg = err.message;
      if (res) msg = "Artist Already Exists";
    }
  );
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  }
  artist = new Artist(newartist);
  await artist.save((err, res) => {
    if (err) msg = err.message;
  });
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  } else {
    const payload = {
      message: "Artist Added Successfully"
    };
    return payload;
  }
};

const createSong = async newsong => {
  let msg = "";
  let song = await Song.findOne(
    {
      song_name: newsong.song_name,
      song_releasedate: newsong.song_releasedate
    },
    (err, res) => {
      if (err) msg = err.message;
      if (res) msg = "Song Already Exists";
    }
  );
  if (msg || song) {
    const payload = {
      error: msg
    };
    return payload;
  } else {
    const image = new Image({ image: newsong.song_cover });
    image.save();
    newsong.song_cover = image.id;
    newsong.user_rating;
    song = new Song(newsong, { autoIndex: false });
    await song.validate().catch(err => {
      console.log(err.message);
      const payload = {
        error: "Artist Objects are invalid"
      };
      return payload;
    });
    if (msg) {
      const payload = {
        error: msg
      };
      return payload;
    }
    await song.save();
    const payload = {
      message: "Song Added Successfully"
    };
    return payload;
  }
};

const getAllArtists = async () => {
  return await Artist.find({}, { __v: 0 });
};
const getAllSongs = async () => {
  return await Song.find(
    {},
    {
      _id: 1,
      song_name: 1,
      user_ratings: 1,
      avg_rating: 1,
      song_artists: 1,
      avg_rating: 1,
      song_album: 1,
      song_releasedate: 1,
      song_cover: 1
    }
  );
};

const getTopArtists = async () => {
  const artists = new Set(
    (await getAllSongs()).map(asyncel => {
      el.song_artists;
    })
  );
  console.log(artists);
  return artists;
};

const getTopSongs = async () => {
  return await Song.find(
    {},
    {
      _id: 0,
      song_name: 1,
      song_cover: 1,
      song_album: 1,
      song_artists: 1,
      song_releasedate: 1,
      user_ratings: 1,
      avg_rating: 1
    }
  )
    .sort("-avg_rating")
    .limit(10);
};
const getImage = async id => {
  return await Image.findById(id);
};
const updateArtist = async (id, updateartist) => {
  let msg = null;
  const artist = await Artist.findOneAndUpdate(
    { _id: id },
    updateartist,
    { new: true },
    (err, res) => {
      if (err) msg = err.message;
      if (!res) msg = "Artist Doesn't Exists";
    }
  );
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  }
  artist.save();
  const payload = {
    message: "Artist Updated Successfully"
  };
  return payload;
};

const updateSong = async (id, updatesong) => {
  let msg = null;
  const song = await Song.findOneAndUpdate(
    { _id: id },
    updatesong,
    { new: true },
    (err, res) => {
      if (err) msg = err.message;
      if (!res) msg = "Song Doesn't Exists";
    }
  );
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  }
  console.log(song);
  song.save();
  const payload = {
    message: "Song Updated Successfully"
  };
  return payload;
};
module.exports = {
  connectDB,
  createUser,
  loginUser,
  createArtist,
  createSong,
  getAllArtists,
  getAllSongs,
  getTopArtists,
  getTopSongs,
  getImage,
  updateArtist,
  updateSong
};
