const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

//fetching data
app.get("/api/satelliteData", async (req, res) => {
  try {
    const response = await axios.get();
  } catch (error) {
    console.log(`Issue with fetch: ${error}`);
  }
});

//loads .env
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
