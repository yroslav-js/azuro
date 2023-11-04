import {ApolloClient, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-mumbai-dev-v3',
  cache: new InMemoryCache(),
});