import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useForm } from "react-hook-form";
import { validateMessages } from "..";
import { registerUser } from "..";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const registerError = useSelector(state => state.auth.registerError, shallowEqual);
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="register-form_login" isRequired isInvalid={errors.login || (registerError && registerError.field === 'login')}>
        <FormLabel>Логин</FormLabel>
        <Input
          name="login"
          ref={register({
            required: validateMessages.login.required,
            minLength: { value: 6, message: validateMessages.login.minLen },
            maxLength: { value: 25, message: validateMessages.login.maxLen },
          })}
          placeholder="Введите логин"
          focusBorderColor="teal.400"
        />
        <FormErrorMessage>
          {errors.login && errors.login.message || (registerError && registerError.error)}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="register-form_password"
        isRequired
        mt="5"
        isInvalid={errors.password || (registerError && registerError.field === 'password')}
      >
        <FormLabel>Пароль</FormLabel>
        <Input
          name="password"
          type="password"
          ref={register({
            required: validateMessages.password.required,
            minLength: { value: 8, message: validateMessages.password.minLen },
            maxLength: { value: 40, message: validateMessages.password.maxLen },
          })}
          placeholder="Введите пароль"
          focusBorderColor="teal.400"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message || (registerError && registerError.error)}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" mt="5" colorScheme="teal">
        Зарегистрироваться
      </Button>
    </form>
  );
};
