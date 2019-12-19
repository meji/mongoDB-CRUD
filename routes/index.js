const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {

  const data = { //DAta que le paso al index
    name: "Jorge",
    cities : ["Madrid", "Paris"]
}
  res.render("home", data); //Le pasamos el data a traves del render del index
});

router.get("/about", (req, res) => {
  res.render("about"); //Le pasamos el data a traves del render del index
});



module.exports = router;
