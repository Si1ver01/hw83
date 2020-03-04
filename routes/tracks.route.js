const { Router } = require("express");
const Track = require("../models/Track.schema");
const Artist = require("../models/Artist.schema");
const Album = require("../models/Album.schema");

const route = Router();

route.get("/", async (req, res) => {
  const { album, artist } = req.query;
  console.log("ALBUM", album);
  console.log("ARTIST", artist);

  if (album) {
    const data = await Track.find({ album });
    return res.status(200).json({ data });
  }

  if (artist) {
    let tracks = await Track.find().populate({
      path: "album",
      match: { artist }
    });
    tracks = tracks.filter(el => el.album !== null);
    return res.status(200).json({ tracks });
  }

  const data = await Track.find();
  res.status(200).json({ data });
});

route.post("/", async (req, res) => {
  const { name, album, duration } = req.body;
  const track = new Track({ name, album, duration });
  await track.save();
  const { _id } = track;
  res.status(200).json({ id: _id, name, album, duration });
});

module.exports = route;
