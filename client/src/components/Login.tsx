import React from "react";
import { useAuthMutation } from "../store/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [backendError, setBackendError] = React.useState("");

  const navigate = useNavigate();

  const [auth, { data, isSuccess, error }] = useAuthMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username && password) {
      await auth({ username, password });
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

  return (
    <>
      <h2>Авторизация</h2>
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
            onClick={handleLogin}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
          Ещё не зарегистрированы? <a href="/register">Регистрация</a>
        </div>
      </Form>
    </>
  );
};

export default Login;
