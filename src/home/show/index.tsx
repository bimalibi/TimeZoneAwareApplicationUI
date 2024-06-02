import React, { useEffect, useState } from "react";
import { baseUrl } from "../../type";
import { useNavigate } from "react-router-dom";

const Index = () => {
  let [data, setData] = useState<any[]>([]);
  console.log(data);
  const token = localStorage.getItem("auth.token");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("auth.token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const fetchData = async () => {
    if (!token) {
      // Handle case when token is not available
      return;
    }

    try {
      let response = await fetch(baseUrl + "/api/timezones", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = async (item: any) => {
    try {
      let response = await fetch(baseUrl + "/api/timeZone", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timeZone: item }),
      });
      let data: any = await response.json();
      console.log(data);
      if (data) {
        localStorage.setItem("auth.zone", data?.timeZone);
        navigate("/");
      }
    } catch (error) {
      console.error("Error calling /api/timeZone:", error);
    }
  };
  return (
    <div>
      <h1>Timezones</h1>
      <ul>
        {data.map((timezone) => (
          <div
            key={timezone.id}
            onClick={() => handleItemClick(timezone?.id)}
            style={{
              marginBottom: "0.5rem",
              borderBottom: "1px solid",
              cursor: "pointer",
            }}
          >
            <li key={timezone.id}>{timezone.displayName}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Index;
