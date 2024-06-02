import { Button, Flex, Table, Typography } from "antd";
// import { useState } from "react";
import moment from "moment";

import { useNavigate } from "react-router-dom";

import { baseUrl } from "../type";
import { useEffect, useState } from "react";

// interface Response {
//   id?: string;
//   statusId?: number;
//   sorting: string;
//   skipCount: number;
//   maxResultCount: number;
// }

const { Text } = Typography;
const token = localStorage.getItem("auth.token");

const View = () => {
  const columns = [
    {
      title: "S.N",
      dataIndex: "sn",
      key: "sn",
      width: 100,
      render: (text: string, record: any, index: number) => index + 1,
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text: string) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text: string) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: 200,
      render: (text: string) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Invited",
      dataIndex: "invited",
      key: "invited",
      width: 200,
      render: (text: string) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Creator DateTime",
      dataIndex: "creatorDateTime",
      key: "creatorDateTime",
      width: 200,
      render: (text: string) => (
        <Text>{moment(text).format("YYYY-MM-DD HH:mm:ss A") || "-"}</Text>
      ),
    },
    {
      title: "Invited DateTime",
      dataIndex: "invitedDateTime",
      key: "invitedDateTime",
      width: 200,
      render: (text: string) => (
        <Text>{moment(text).format("YYYY-MM-DD HH:mm:ss A") || "-"}</Text>
      ),
    },
  ];

  //   const data = initialData;

  //   const [res, setRes] = useState<Response>({
  //     ...data,
  //     id: "1",
  //   });
  useEffect(() => {
    const zone = localStorage.getItem("auth.zone");
    if (!zone) {
      navigate("/show");
    }
  }, []);

  const navigate = useNavigate();
  const handleAdd = () => {
    console.log("Add");
    navigate("/meeting");
  };
  const [data, setData] = useState<any[]>();
  const fetchData = async () => {
    if (!token) {
      // Handle case when token is not available
      return;
    }

    try {
      let response = await fetch(baseUrl + "/api/meetings", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      let data: any = await response.json();
      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const show = localStorage.getItem("auth.zone");
  useEffect(() => {
    fetchData();
  }, []);

  const handleShow = () => {
    navigate("/show");
  };
  return (
    <div
      style={{ marginLeft: "0.5rem", marginRight: "0.5rem", marginTop: "1rem" }}
    >
      <Flex justify="space-between" style={{ marginBottom: "0.5rem" }}>
        <Button title="Add Time" style={{}} onClick={handleAdd}>
          Add Meeting
        </Button>
        <Button title="Add Time" style={{}} onClick={handleShow}>
          {show}
        </Button>
      </Flex>
      <Table
        showSorterTooltip={false}
        columns={columns}
        dataSource={(data as any) || []}
        // onChange={handleTableChange}
        // pagination={{
        //   current: tableInfo?.skipCount / tableInfo?.maxResultCount + 1,
        //   total: data?.totalCount,
        // }}
        tableLayout="auto"
        bordered
      />
    </div>
  );
};

export default View;
