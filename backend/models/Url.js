const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", UrlSchema);
