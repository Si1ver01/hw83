const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String },
  info: { type: String }
});

module.exports = model("Artist", schema);
