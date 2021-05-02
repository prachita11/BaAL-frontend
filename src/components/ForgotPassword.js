import { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button, Spin } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import "leaflet/dist/leaflet.css";
import React from "react";
import "../App.css";
import { userLogin, resetPass } from "../service/stateService";
const { Content } = Layout;
const ForgotPassword = () => {
  /* ------------Select data population --------------*/
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    setLoading(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (email == "" || !pattern.test(email)) {
      setError(true);
      setErrMsg("Enter a valid email id");
      setLoading(false);
      return;
    }
    let data = await resetPass({ email: email });
    console.log(data);
    setEmail("");

    // if (data.error == true) {
    //   setLoading(false);
    //   setError(true);
    //   return;
    // }
  };
  /* ------------View --------------*/
  return (
    <Layout>
      <Content
        style={{
          background:
            "linear-gradient(to bottom ,white 70%,  rgb(147, 197, 114) 30%)",
          height: "100vh",
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col
            md={{ offset: 6, span: 10 }}
            xs={24}
            style={{
              marginTop: "10%",
              backgroundColor: "white",
              height: "60%",
              borderRadius: "25px",
              boxShadow: " 0 3px 12px rgb(52 31 97 / 89%)",
            }}
          >
            <Row>
              <Col
                className="headings"
                style={{
                  paddingTop: "2%",
                  paddingLeft: "4%",
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "rgb(147, 197, 114)",
                  fontFamily: "Poppins ,sans-serif",
                }}
                offset={6}
              >
                {" "}
                <LockOutlined
                  style={{ fontSize: "6rem", paddingLeft: "34%" }}
                />{" "}
                <br></br>
                Reset Password
              </Col>

              <Col
                span={24}
                style={{
                  paddingTop: "10%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                {" "}
                {error && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    {errMsg}
                  </span>
                )}
              </Col>

              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setError(false)}
                  style={{
                    height: "60px",
                    color: "gray",
                    fontFamily: "Poppins , sans-serif",
                    borderRadius: "10px",
                  }}
                  placeholder="Email"
                />
              </Col>

              <Col
                className="forgotp"
                md={24}
                xs={{ span: 20, offset: 4 }}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <Button
                  className="update"
                  block
                  type="primary"
                  block
                  onClick={sendMail}
                  style={{
                    fontSize: "22px",
                    height: "55px",
                    backgroundColor: "rgb(147, 197, 114)",
                    border: "rgb(147, 197, 114)",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  {loading && <Spin />} Send reset link
                </Button>
                <br></br> <br></br> <br></br>
              </Col>
              <Col
                className="titles"
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "38%",
                  paddingRight: "10%",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                Go back to{" "}
                <a href="login" style={{ color: "rgb(147, 197, 114)" }}>
                  Sign In
                </a>
              </Col>
            </Row>{" "}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
