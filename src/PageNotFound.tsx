import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      {" "}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" style={{ borderRadius: "5px" }}>
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
};

export default PageNotFound;
