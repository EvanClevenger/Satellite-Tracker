const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

//fetching data
app.get("/api/satellites", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sscweb.gsfc.nasa.gov/WS/sscr/2/observatories"
    );
    console.log(response.data);

    const rawList = response.data[1]?.Observatory?.[1];

    console.log(rawList);

    if (!Array.isArray(rawList)) {
      throw new Error("Weird sat data structure ");
    }

    const satellites = rawList.map(([_, sats]) => ({
      id: sats.Id,
      name: sats.Name,
      description: sats.Description,
    }));

    res.json({ satellites }); // sends res to frontend
  } catch (error) {
    console.log(`There was an error getting Sat Data: ${error}`);
    res.status(500).json({ error: "failed to fetch sat data" });
  }
});

//loads .env
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
