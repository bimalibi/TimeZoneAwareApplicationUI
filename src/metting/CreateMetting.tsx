import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import "../index.css";
import { baseUrl } from "../type";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const [initialDateTime, setInitialDateTime] = useState<Dayjs | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  React.useEffect(() => {
    const utcString = "2024-06-02T05:08:03Z";
    const dateTime = dayjs(utcString);
    setInitialDateTime(dateTime);
  }, []);
  const token = localStorage.getItem("auth.token");
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  const onFinish = async (values: any) => {
    const utcDate = values.startDateTime.utc().format();
    const payload = {
      ...values,
      startDateTime: utcDate,
    };
    console.log("Received values of form: ", payload);
    let response = await fetch(baseUrl + "/api/meetings/Create", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    let data: any = await response.json();
    if (data) {
      console.log(data);
    }
  };

  const fetchData = async () => {
    if (!token) {
      // Handle case when token is not available
      return;
    }

    try {
      let response = await fetch(baseUrl + "/api/users", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let data: any = await response.json();
      if (data) {
        console.log(data);
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
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
          Schedule Meeting
        </Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            dateTime: initialDateTime,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Input Title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="startDateTime"
            rules={[{ required: true, message: "Input Start Date and Time!" }]}
          >
            <DatePicker
              showTime
              style={{ height: "40px", width: "300px" }}
              placeholder="Select Start Date and Time"
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Enter Note!" }]}
          >
            <TextArea
              style={{ height: "70px", width: "300px" }}
              placeholder="Enter Description"
            />
          </Form.Item>
          <Form.Item
            name="invitedUserId"
            rules={[{ required: true, message: "Choose Select!" }]}
          >
            <Select placeholder="Select an option" style={{ width: "300px" }}>
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ borderRadius: "5px", width: "6rem", marginLeft: "6rem" }}
              onClick={handleNavigate}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
};

export default Register;
