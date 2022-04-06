import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const client = new ApolloClient({
  uri: "https://cold-impala-31.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export const LoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

export const getUserLogin = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "true"],
  ]);
  LoggedInVar(true);
  tokenVar(token);
};

export const getUserLogout = async () => {
  await AsyncStorage.multiRemove(["token", "loggedIn"]);
  LoggedInVar(false);
  tokenVar("");
};
