const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const shortid = require("shortid");

// Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL is required" });

    const shortCode = shortid.generate();
    console.log(shortCode)

    const newUrl = await Url.create({ longUrl, shortCode });

    console.log(newUrl)

    res.json({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect to original URL
router.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;
    console.log(shortcode)
    const urlData = await Url.findOne({ shortCode: shortcode });
    console.log(urlData)

    if (!urlData) return res.status(404).json({ error: "Not found" });

    urlData.visitCount += 1;
    await urlData.save();

    res.redirect(urlData.longUrl);
    console.log(urlData.longUrl)
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin page data
router.get("/api/admin", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
