const { Router } = require("express");
const Artist = require("../models/Artist.schema");
const multer = require("../multer");
const router = Router();

router.get("/", async (req, res) => {
  const data = await Artist.find();
  res.status(200).json({ data });
});

router.post("/", multer.single("image"), async (req, res) => {
  const { name, info } = req.body;

  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }

  const artist = new Artist({ name, info, photo: filename });
  await artist.save();
  const { _id } = artist;

  res.status(201).json({ id: _id, name, info, image: filename });
});

module.exports = router;
