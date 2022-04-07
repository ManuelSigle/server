const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/stylesheet", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "css", "bootstrap.css"));
});
router.get("/script", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js", "bootstrap.bundle.js"));
});

module.exports = router;