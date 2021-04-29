import { useState } from "react";
import { Result } from "antd";
import { Layout, Button, Row, Col } from "antd";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "moment-timezone";
import "leaflet/dist/leaflet.css";
import "./styles/DeveloperDashboard.css";
import React from "react";
import "../App.css";
import Logo from "./logo.jpg";
const { Content } = Layout;

const SuccessPage = () => {
  let location = useLocation();
  let history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("home"), 3000);
  }, []);
  return (
    <Layout>
      <Layout style={{ height: "100vh" }}>
        <Content
          style={{
            color: "#5a5a5a",
            boxShadow: "    6px 6px 8px 8px gray",
            height: "100vh",
            background:
              "linear-gradient(to right bottom,  rgb(147, 197, 114) 60% ,rgb(255 252 202 / 41%)  50%)",
          }}
        >
          <Row
            style={{
              paddingTop: "15%",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Col
              span={24}
              style={{
                backgroundColor: "white",
                padding: "3%",
                height: "480px",
                border: "solid gray 2px",
              }}
            >
              <Result
                status="success"
                title="Successfully subscribed"
                extra={[
                  <span style={{ color: "green", fontWeight: "bolder" }}>
                    {" "}
                    Redirecting to Dashboard, please wait... <br></br>
                  </span>,
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => history.push("home")}
                  >
                    Go to Dashboard
                  </Button>,
                ]}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuccessPage;
