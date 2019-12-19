const express = require("express");
const router = express.Router();

router.use("/all", require("./allBeers.js"))
router.use("/details", require("./beerDetails.js"))



module.exports = router;
