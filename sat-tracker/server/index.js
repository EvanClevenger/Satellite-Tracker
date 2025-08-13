const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const axios = require("axios");
const satelliteList = require("../data/satList.json");
const satelliteRoutes = require("../routes/satRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // allows express to parse json

//fetching data from N2YO.com
app.use("/frontend", satelliteRoutes);

//fetch satList from data/satList
app.get("/api/staticSatelliteList", (req, res) => {
  res.json(satelliteList);
  console.log(res);
});

//loads .env
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
