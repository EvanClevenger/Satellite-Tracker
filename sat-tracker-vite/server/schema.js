import graphql from "graphql";
import satelliteList from "../data/satList.json" with { type: "json" };

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
// GraphQLList defines arrays, GraphQLObjectType defines custom types

const SatNameAndCatID = new GraphQLObjectType({
  name: "SatNameAndCatID",
  fields: {
    OBJECT_NAME: { type: GraphQLString },
    NORAD_CAT_ID: { type: GraphQLInt },
  },
});
//this creates a custom type, it exposes only 2 feilds

//entry point for GraphQL queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", // entry point for all GraphQL queries
  fields: {
    satellites: {
      type: new GraphQLList(SatNameAndCatID),
      resolve(parent, args) {
        const result = satelliteList.map((sat) => ({
          OBJECT_NAME: sat.OBJECT_NAME,
          NORAD_CAT_ID: sat.NORAD_CAT_ID,
        })); // this is optional, just to list the filtered feilds for the console.log, Could just return 'results' right away
        // console.log(result); proves that we only fetch OBJECT_NAME & NORAD_CAT_ID
        return result;
      },
    },
  },
});
// feild : {satellites {} } returns a list of SatNameAndCatID objects
// resolve pulls from the static data defined in line 2, (parent, args) is needed but not used.

export default RootQuery;
