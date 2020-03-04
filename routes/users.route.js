const { Router } = require("express");
const nanoid = require("nanoid");
const bcrypt = require("bcryptjs");

const User = require("../models/User.scheme");

const router = Router();

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  const candidate = await User.findOne({ name });

  if (candidate) {
    return res.status(400).json({ message: "Такой пользователь уже есть" });
  }

  const user = new User({ user: name, password });
  await user.save();

  return res.status(200).json({ user });
});

router.post("/sessions", async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ user: name });

  if (!user) {
    return res.status(400).json({ message: "Пользователь не найден" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Пароль неверный" });
  }

  const token = nanoid(5);
  user.token = token;
  await user.save();

  return res.status(200).json({ token });
});

module.exports = router;
