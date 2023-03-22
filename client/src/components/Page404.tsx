import { Empty, Space, Typography } from "antd";
const { Text, Link } = Typography;

const Page404 = () => {
  return (
    <div className="error-page">
      <Empty />
      <Space direction="vertical">
        <Text>Страница не найдена</Text>
        <Link href="/login">Назад</Link>
      </Space>
    </div>
  );
};

export default Page404;
