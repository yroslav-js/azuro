import {ApolloClient, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-v3',
  cache: new InMemoryCache(),
});