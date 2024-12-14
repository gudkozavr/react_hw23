import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Button, Space } from "antd";
import { useEffect } from "react";

const { Text } = Typography;

export default function Profile() {
  const token = localStorage.getItem("token");
  const tokenData =
    token && jwtDecode(token).exp * 1000 > Date.now() ? jwtDecode(token) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!tokenData) {
    return <h1>Unauthorized</h1>;
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  useEffect(() => {
    !tokenData && handleLogout();
  }, []);

  return (
    <Card title="User Profile">
      <Space direction="vertical">
        <Text>Token data</Text>
        <Text type="danger">{tokenData.user.id}</Text>
        <Button danger onClick={handleLogout}>
          log out
        </Button>
      </Space>
    </Card>
  );
}
