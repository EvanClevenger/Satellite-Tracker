const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const SatNameAndCatID = new GraphQLObjectType({
  name: "SatNameAndCatID",
  fields: {
    OBJECT_NAME: { type: GraphQLString },
    NORAD_CAT_ID: { type: GraphQLInt },
  },
});
