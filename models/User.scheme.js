const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }
});

schema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = model("User", schema);
