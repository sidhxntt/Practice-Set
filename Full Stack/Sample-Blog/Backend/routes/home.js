const express = require("express");
const router = express.Router();

// Serve favicon.ico to prevent CastError
router.get("/favicon.ico", (req, res) => res.status(204).end());


module.exports = router;
