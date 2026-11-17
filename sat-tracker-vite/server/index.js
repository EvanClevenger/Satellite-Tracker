import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { graphqlHTTP } from "express-graphql";
// connects schema to express route
import { GraphQLSchema } from "graphql";
// wraps root query into a full schema object

import satelliteRoutes from "./routes/satRoutes.js";
import RootQuery from "./schema.js";

const app = express();
app.use(cors());
app.use(express.json()); // allows express to parse json
app.use(
  "/graphql",
  graphqlHTTP({
    schema: new GraphQLSchema({ query: RootQuery }),
  }),
); // GraphQL method of getting static data

//fetching data from N2YO.com
app.use("/frontend", satelliteRoutes);

//fetch satList from data/satList
// app.get("/api/staticSatelliteList", (req, res) => {
//   res.json(satelliteList);
//   console.log(res);
// });
//REST method of getting static data

//loads .env
dotenv.config();
const PORT = process.env.PORT || 5000;
const LOOP_BACK = process.env.LOOP_BACK;

app.listen(PORT, LOOP_BACK, () => {
  console.log(`Application is listening on port ${PORT}`);
});

// I added a loopback address, this is a tunnel to my Pi without communication through local wi-fi. CloudFlare tunnel connects users to my Pi via HTTPS
