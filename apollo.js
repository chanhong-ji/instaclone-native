import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

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
  uri: "https://polite-emu-51.loca.lt/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
