const mongoose = require("mongoose");
const config = require("config");
const dbURI = config.get("mongoURI");
const Shorturl = require("../models/Shorturl");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// mongoose.connect(db);

//New Standard, Looks Synchronous
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
// Function to get new shortened URL
async function createUser(newuser) {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
    }

    user = new User(newuser);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtKey"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (e) {
    throw new Error("URL is unavailable");
  }
}

// Function to find Full URL from short URL
async function loginUser(candidate) {
  try {
    let user = await User.findOne({ email: candidate.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Creadentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid Creadentials" }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtKey"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    throw new Error("URL is unavaiable");
  }
}

//Function to get No. of clicks using the short Url
async function getClicksCount(surl) {
  try {
    const foundobj = await Shorturl.findOne({
      shorturl: surl
    });
    if (foundobj == null) return 0;
    return foundobj.clicks;
  } catch (e) {
    throw new Error("URL is Unavailable");
  }
}
async function createCustomURL(lurl, surl) {
  try {
    const newobj = await Shorturl.create({
      fullurl: lurl,
      shorturl: surl
    });
    return newobj.shorturl;
  } catch (e) {
    throw new Error("URL is unavaiable");
  }
}

module.exports = {
  connectDB,
  createUser,
  loginUser,
  getClicksCount,
  createCustomURL
};
