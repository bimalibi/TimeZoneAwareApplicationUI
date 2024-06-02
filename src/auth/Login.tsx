/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Space, Typography } from "antd";
import { Form } from "antd";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
// import useGetLogin from "../hooks/Login/useGetLogin";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../type";
// const apiUrl = process.env.REACT_APP_API_URL;

interface FormValue {
  email: string;
  password: string;
}
const { Text, Title } = Typography;
const Login = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    let data = localStorage.getItem("auth.token");
    if (data) {
      navigate("/");
    }
  }, []);

  // const { mutate } = useGetLogin();
  const onFinish = async (values: FormValue) => {
    console.log("Received values of form: ", values);
    let response = await fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    let data: any = await response.json();
    console.log(data);

    if (data) {
      console.log(data);
      localStorage.setItem("auth.token", data?.accessToken);
      navigate("/");
    }
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
          Login Here
        </Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              style={{ height: "40px", width: "300px" }}
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
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
              style={{
                borderRadius: "5px",
                width: "6rem",
                marginLeft: "6rem",
              }}
            >
              Login
            </Button>
          </Form.Item>
          <Text style={{ marginLeft: "3rem" }}>
            Don't have an account ? <Link to="/register">Register Now</Link>
          </Text>
        </Form>
      </Space>
    </Space>
  );
};

export default Login;
