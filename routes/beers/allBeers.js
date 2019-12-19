const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://api.punkapi.com/v2/beers");
        res.render("beers", {beers:response.data});
        console.log(response.data)
    }
    catch(error){
        console.log(error);
    }
})


module.exports = router;
