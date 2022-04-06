import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput, toNext } from "../components/auth/AuthShared";

export default function CreateAccount({ navigation }) {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  const onValid = () => {};

  useEffect(() => {
    register("email");
    register("username");
    register("password");
    register("passwordConfirm");
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
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        returnKeyType="next"
        placeholderTextColor="grey"
        ref={usernameRef}
        onSubmitEditing={() => toNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="Password"
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
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
