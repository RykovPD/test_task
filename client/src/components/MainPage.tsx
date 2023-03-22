import React from "react";
import { authApi, useFetchUserQuery } from "../store/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signOut } from "../store/authSlice";
import { Card, Button, Space } from "antd";
const { Meta } = Card;

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const { data: user, isSuccess } = useFetchUserQuery();

  const handleLogout = () => {
    dispatch(authApi.util.resetApiState());
    dispatch(signOut());
    navigate("/login");
  };

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="main-page-container">
      <h2>Добро пожаловать, {user?.data.username}!</h2>
      {isSuccess && (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="аватар" src={user.data.avatar} />}
        >
          <Meta title={user.data.username} description={user.data.about} />
        </Card>
      )}
      <Space wrap>
        <Button onClick={handleLogout} type="primary">
          Выйти из аккаунта
        </Button>
      </Space>
    </div>
  );
};

export default MainPage;
