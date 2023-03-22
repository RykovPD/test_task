import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Button, Form, Input } from "antd";

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [backendError, setBackendError] = React.useState("");

  const navigate = useNavigate();

  const [register, { data, isSuccess, error }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      await register({ username, password });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUserData({ token: data.token }));
      navigate("/");
    }
  });

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
  }

  React.useEffect(() => {
    if (isFetchBaseQueryError(error)) {
      const errorText = (error.data as { token: string; error: string }).error;
      setBackendError(errorText);
    }
  }, [error]);
  console.log(data);
  return (
    <>
      <h2>Регистрация</h2>
      <Form name="normal_login" className="login-form">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Вы не указали имя!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Вы не указали пароль" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <span className="backend-error-text">{backendError}</span>
        <div className="input-content">
          <Button
            onClick={handleRegister}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Зарегистрироваться
          </Button>
          Уже зарегистрированы? <a href="/login">Войти</a>
        </div>
      </Form>
    </>
  );
};

export default Register;
