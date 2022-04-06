import { gql, useMutation } from "@apollo/client";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput, toNext } from "../components/auth/AuthShared";
import { Alert } from "react-native";

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) return Alert.alert("Fail", error);
    const { username, password } = getValues();
    navigation.navigate("Login", { username, password });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted,
  });

  const onValid = (data) => {
    if (loading) return;
    if (data.password !== data.passwordConfirm) {
      return Alert.alert("Password Wrong", "password confirm is not matched");
    }
    const { email, username, password } = getValues();
    createAccount({ variables: { email, username, password } });
  };

  useEffect(() => {
    register("email", { required: true, maxLength: 150 });
    register("username", { required: true, maxLength: 30 });
    register("password", { required: true, minLength: 4, maxLength: 16 });
    register("passwordConfirm", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus
        returnKeyType="next"
        placeholderTextColor="grey"
        ref={emailRef}
        onSubmitEditing={() => toNext(usernameRef)}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        placeholder="Username 4-20"
        keyboardType="default"
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor="grey"
        ref={usernameRef}
        onSubmitEditing={() => toNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="Password 4-16"
        textContentType="password"
        autoCapitalize="none"
        clearTextOnFocus
        secureTextEntry
        returnKeyType="next"
        placeholderTextColor="grey"
        ref={passwordRef}
        onSubmitEditing={() => toNext(passwordConfirmRef)}
        onChangeText={(text) => setValue("password", text)}
      />
      <TextInput
        placeholder="Password Confirm"
        textContentType="password"
        autoCapitalize="none"
        clearTextOnFocus
        secureTextEntry
        returnKeyType="join"
        placeholderTextColor="grey"
        ref={passwordConfirmRef}
        onSubmitEditing={handleSubmit(onValid)}
        lastone={true}
        onChangeText={(text) => setValue("passwordConfirm", text)}
      />
      <AuthButton
        text="Create Account"
        loading={loading}
        disabled={
          !watch("email") ||
          !watch("username") ||
          !watch("password") ||
          !watch("passwordConfirm")
        }
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
