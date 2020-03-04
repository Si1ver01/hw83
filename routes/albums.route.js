const { Router } = require("express");

const Album = require("../models/Album.schema");
const multer = require("../multer");
const route = Router();

route.get("/", async (req, res) => {
  const { artist } = req.query;

  if (artist) {
    const data = await Album.find({ artist });
    return res.status(200).json({ data });
  }

  const data = await Album.find();
  res.status(200).json({ data });
});

route.post("/", multer.single("image"), async (req, res) => {
  const { name, artist, date } = req.body;
  let fileName = null;

  if (req.file) {
    fileName = req.file.filename;
  }

  const album = new Album({ name, artist, date, image: fileName });
  await album.save();
  const { _id } = album;
  res.status(200).json({ id: _id, name, artist, date, image: fileName });
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Album.findOne({ _id: id }).populate("artist");
  res.status(200).json({ data });
});

module.exports = route;
