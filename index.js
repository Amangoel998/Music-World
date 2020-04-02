const express = require("express");
const { connectDB } = require("./config/db");
const app = express();
const fileUpload = require("express-fileupload");

//Connect Database
connectDB();

//Init Middleware
app.set("view engine", "ejs");
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }
  })
);
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.status(200));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/songs", require("./routes/songs"));
app.use("/api/artists", require("./routes/artists"));
app.use("/api/topsongs", require("./routes/topsongs"));
app.use("/api/topartists", require("./routes/topartists"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
