import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Field, Form } from "../components";
import { useLogin } from "../api/hooks/useLogin";
import { TCredentials } from "../api/models";

export const LoginPage = () => {
  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>();
  const loginUser = useLogin();

  const navigate = useNavigate();

  const handleRegister = () => navigate("/register");
  const handleLogin = (data: TCredentials) => loginUser(data);

  return (
    <Form
      title="Добро пожаловать в облачное хранилище LUFI"
      onSubmit={handleSubmit(handleLogin)}
      footer={
        <>
          <Button label="Войти" primary />
          <p>или</p>
          <Button label="Зарегистрироваться" onClick={handleRegister} />
        </>
      }
    >
      <Field
        label="Логин"
        error={errors.username?.message}
        {...field("username", {
          required: "Логин обязателен",
        })}
      />
      <Field
        label="Пароль"
        error={errors.password?.message}
        obscure
        {...field("password", {
          required: "Пароль обязателен",
        })}
      />
    </Form>
  );
};
