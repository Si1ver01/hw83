const { Router } = require("express");
const User = require("../models/User.scheme");
const TrackHistory = require("../models/TrackHistory.schema");

const router = Router();

router.post("/track_history", async (req, res) => {
  const token = req.get("token");
  const { track } = req.body;

  const user = await User({ token });

  if (!user) {
    return res.status(200).json({ message: "Токен не найден" });
  }

  const trackHistory = TrackHistory({ user: user._id, track });
  await trackHistory.save();

  res.status(200).json({ trackHistory });
});

module.exports = router;
