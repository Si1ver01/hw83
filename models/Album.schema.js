const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  artist: { type: Types.ObjectId, ref: "Artist", required: true },
  date: { type: Date, required: true },
  image: { type: String }
});

module.exports = model("Album", schema);
