import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Field, Form } from "../components";
import { TCredentials } from "../api/models/credentials-model";
import { useRegister } from "../api/hooks/useRegister";

export const RegisterPage = () => {
  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredentials>();
  const registerUser = useRegister();

  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = (data: TCredentials) => registerUser(data);

  return (
    <Form
      title="Добро пожаловать в облачное хранилище LUFI"
      footer={<Button label="Зарегистрироваться" />}
      onSubmit={handleSubmit(handleRegister)}
      onBack={handleLogin}
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
        {...field("password", {
          required: "Пароль обязателен",
        })}
      />
    </Form>
  );
};
