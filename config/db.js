const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const User = require("../models/User");
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
  if (msg) {
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
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  }
  song = new Song(newsong);
  await song.validate().catch(err => {
    console.log(err.message);
    const payload = {
      error: "Artist Objects are invalid"
    };
    return payload;
  });
  await song.save((err, res) => {
    if (err) msg = err.message;
  });
  if (msg) {
    const payload = {
      error: msg
    };
    return payload;
  } else {
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
      _id: 0,
      song_name: 1,
      song_artists: 1,
      avg_rating: 1,
      song_album: 1,
      song_releasedate: 1,
      song_cover: 1
    }
  );
};

const getTopArtists = async () => {
  const topsongs = await getAllSongs();
  let topartists = [];
  let count = 10;
  topsongs.forEach(el => {
    el.song_artists.forEach(async el => {
      const artist = await Artist.findById(el);
      topartists.push(artist.artist_name);
      count++;
    });
    if (count > 10) return topartists;
  });
  return topartists;
};
const getTopSongs = async () => {
  return await Song.find(
    {},
    {
      _id: 0,
      song_name: 1,
      song_artists: 1,
      avg_rating: 1,
      song_album: 1,
      song_releasedate: 1,
      song_cover: 1
    }
  )
    .sort("avg_rating")
    .limit(10);
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
  getTopSongs
};
