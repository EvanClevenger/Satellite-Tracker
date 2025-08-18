const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config(); // loads .env

//req is incoming res is outgoing
router.post("/selectedSat", async (req, res) => {
  const { id, observer_lat, observer_lng, observer_alt, seconds } = req.body;
  // pulls out the params cuz we send the api from the frontend as an {}
  if (!id || !observer_lat || !observer_lng || !observer_alt || !seconds) {
    return res.status(400).json({ error: "Missing params" }); // just a validator
  }
  console.log(req.body);

  // const API_KEY = process.env.N2YO_API_KEY;
  const URL = `https://api.n2yo.com/rest/v1/satellite/positions/${id}/${observer_lat}/${observer_lng}/${observer_alt}/${seconds}/?apiKey=SKPNNP-L5CAXG-HY6Q4C-5JQC`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    res.json(data); //sends data to frontend
  } catch (error) {
    res.status(500).json({ error: "failed to fetch sat data ;(" });
    console.log(`There was an error with getting the sat data: ${error}`);
  }
});

module.exports = router;
