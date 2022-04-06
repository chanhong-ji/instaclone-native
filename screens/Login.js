import { useEffect, useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { TextInput, toNext } from "../components/auth/AuthShared";
import { gql, useMutation } from "@apollo/client";
import { getUserLogin } from "../apollo";
import { Alert } from "react-native";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login({ navigation, route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) return Alert.alert("Fail", String(error));
    await getUserLogin(token);
  };
  const [login, { loading }] = useMutation(LOGIN, { onCompleted });

  const onValid = (data) => {
    if (loading) return;
    login({ variables: { ...data } });
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="username"
        autoCapitalize="none"
        autoFocus
        returnKeyType="next"
        placeholderTextColor="grey"
        onSubmitEditing={() => toNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        placeholder="password"
        autoCapitalize="none"
        textContentType="password"
        returnKeyType="done"
        secureTextEntry
        clearTextOnFocus
        placeholderTextColor="grey"
        ref={passwordRef}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        text="Login"
        onPress={handleSubmit(onValid)}
        loading={loading}
        disabled={!watch("username") || !watch("password")}
      />
    </AuthLayout>
  );
}
