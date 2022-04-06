import { useEffect, useRef } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { TextInput, toNext } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();
  const onValid = (data) => {};
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="username"
        autoCapitalize={false}
        autoFocus
        returnKeyType="next"
        placeholderTextColor="grey"
        onSubmitEditing={toNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        placeholder="password"
        autoCapitalize={false}
        textContentType="password"
        returnKeyType="done"
        secureTextEntry
        clearTextOnFocus
        placeholderTextColor="grey"
        ref={passwordRef}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton text="Login" onPress={handleSubmit(onValid)} />
    </AuthLayout>
  );
}
