import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protectedRoute";
import { Flex, Menu } from "antd";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Home from "./pages/home";
import { useSelector } from "react-redux";

function App() {
  const [current, setCurrent] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const onClick = (event) => {
    setCurrent(event.key);
  };
  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "login",
      label: <Link to="/login">Login</Link>,
      icon: <LoginOutlined />,
      disabled: isLoggedIn,
    },
    {
      key: "register",
      label: <Link to="/register">Register</Link>,
      icon: <UserAddOutlined />,
    },
    {
      key: "profile",
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
      disabled: !isLoggedIn,
    },
  ];
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  return (
    <Flex vertical align="center" justify="center" gap="middle" wrap>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setCurrent={setCurrent} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile setCurrent={setCurrent} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Flex>
  );
}

export default App;
