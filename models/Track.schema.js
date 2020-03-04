const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  album: { type: Types.ObjectId, ref: "Album", required: true },
  duration: { type: Number, required: true }
});

module.exports = model("Track", schema);
