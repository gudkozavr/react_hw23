import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetState } from "../../redux/slices/authSlice";
import { Flex, Button, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function Login({ setCurrent }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientReady, setClientReady] = useState(false);
  const [form] = Form.useForm();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  function handleSubmit({ email, password }) {
    dispatch(login({ email, password }));
  }
  function handleReset() {
    form.resetFields();
  }

  useEffect(() => {
    setClientReady(true);
    if (isSuccess) {
      navigate("/profile");
      setCurrent("profile");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch, setCurrent]);

  return (
    <>
      <Form
        form={form}
        name="login"
        autoComplete="off"
        onFinish={handleSubmit}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail" },
            { required: true, message: "Please input your email" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            name="email"
            placeholder="Login\Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Flex gap={8}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
}
