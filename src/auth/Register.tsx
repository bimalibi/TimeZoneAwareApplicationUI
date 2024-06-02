/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Input, Space, Typography, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
// import usePostRegister from "../hooks/Register/usePostRegister";
import "../index.css";

interface FormValue {
  email: string;
  password: string;
}

const { Text, Title } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  // const { mutate } = usePostRegister();

  const onFinish = async (values: FormValue) => {
    console.log("Received values of form: ", values);
    // mutate(values);
    let response = await fetch("https://localhost:44323/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    response = await response.json();
    console.log(response);
  };

  return (
    <Space
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30rem",
          height: "25rem",
        }}
        className="neomorph"
      >
        <Title level={3} style={{ paddingTop: "1rem" }}>
          Register
        </Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              style={{ height: "40px", width: "300px" }}
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              style={{ height: "40px", width: "300px" }}
              placeholder="Enter Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ borderRadius: "5px", width: "6rem", marginLeft: "6rem" }}
            >
              Sign Up
            </Button>
          </Form.Item>
          <Text style={{ marginLeft: "3rem" }}>
            Already have an account? <Link to="/login">Login Now</Link>
          </Text>
        </Form>
      </Space>
    </Space>
  );
};

export default Register;
