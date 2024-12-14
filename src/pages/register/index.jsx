import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { isLoading, isSuccess } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch]);

  function handleSubmit({ email, password }) {
    dispatch(register({ email, password }));
  }

  const formLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Form
      form={form}
      {...formLayout}
      onFinish={handleSubmit}
      initialValues={{ email: "", password: "", confirmPassword: "" }}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { type: "email", message: "The input is not valid E-mail" },
          { required: true, message: "Please input your email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that your entered doesn't match")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
