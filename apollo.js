import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export const LoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

export const getUserLogin = async (token) => {
  await AsyncStorage.setItem("token", token);
  LoggedInVar(true);
  tokenVar(token);
};

export const getUserLogout = async () => {
  await AsyncStorage.removeItem("token");
  LoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "https://average-termite-96.loca.lt/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        seePhotoLikes: offsetLimitPagination(),
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache,
});
