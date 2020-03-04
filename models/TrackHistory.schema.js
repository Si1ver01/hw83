const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  track: { type: Types.ObjectId, ref: "Track", required: true },
  datetime: { type: Date, default: new Date().toISOString() }
});

module.exports = model("TrackHistory", schema);
