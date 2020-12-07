import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { logUser } from "..";
import { validateMessages } from "..";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.logError, shallowEqual);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    dispatch(logUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="login-form_login"
        isRequired
        isInvalid={errors.login || (loginError && loginError.field === "login")}
      >
        <FormLabel>Логин</FormLabel>
        <Input
          name="login"
          ref={register({ required: validateMessages.login.required })}
          placeholder="Введите логин"
          focusBorderColor="teal.400"
        />
        <FormErrorMessage>
          {(errors.login && errors.login.message) ||
            (loginError && loginError.error)}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="login-form_password"
        isRequired
        mt="5"
        isInvalid={
          errors.password || (loginError && loginError.field === "password")
        }
      >
        <FormLabel>Пароль</FormLabel>
        <Input
          name="password"
          ref={register({ required: validateMessages.password.required })}
          type="password"
          placeholder="Введите пароль"
          focusBorderColor="teal.400"
        />
        <FormErrorMessage>
          {(errors.password && errors.password.message) ||
            (loginError && loginError.error)}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" mt="5" colorScheme="teal">
        Вход
      </Button>
    </form>
  );
};
