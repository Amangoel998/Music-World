// const FileType = require("file-type");
module.exports = filevalidator = async (req, res, next) => {
  if (!req.file||!req.files.cover_image || Object.keys(req.files).length === 0) {
    console.log("File Not Uploaded");
    return res.status(401).json({ msg: "File is required" });
  }
  const type = req.files.cover_image.mimetype;
  // const type = await FileType.fromBuffer(req.files.cover_image.data)
  if (type === "image/jpeg" || type === "image/png") next();
  else res.status(401).json({ msg: "File Type Not acceptable" });
};
