const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql"); // connects schema to express route
const { GraphQLSchema } = require("graphql"); // wraps root query into a full schema object

// const satelliteList = require("../data/satList.json");
const satelliteRoutes = require("../routes/satRoutes");
const RootQuery = require("./schema");

// const { graphqlHTTP } = require("express-graphql");

const app = express();
app.use(cors());
app.use(express.json()); // allows express to parse json
app.use(
  "/graphql",
  graphqlHTTP({
    schema: new GraphQLSchema({ query: RootQuery }),
  })
); // GraphQL method of getting static data

//fetching data from N2YO.com
app.use("/frontend", satelliteRoutes);

//fetch satList from data/satList
// app.get("/api/staticSatelliteList", (req, res) => {
//   res.json(satelliteList);
//   console.log(res);
// }); REST method of getting static data

//loads .env
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});
