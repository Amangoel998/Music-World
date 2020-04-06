// const FileType = require("file-type");
module.exports = filevalidator = async (req, res, next) => {
  if (req.body.cover_image) {
    const type = req.body.cover_image.contentType;
    if (type === "image/jpeg" || type === "image/png") next();
    else return res.status(400).json({ error: "File Type Not acceptable" });
  } else {
    console.log("File Not Uploaded");
    res.status(400).json({ error: "File is required" });
  }
};
