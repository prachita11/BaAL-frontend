import { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
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
      <Content style={{ backgroundColor: "#93C572", height: "100vh" }}>
        <Row style={{ height: "100%" }}>
          <Col
            md={{ offset: 6, span: 10 }}
            xs={24}
            style={{
              marginTop: "10%",
              backgroundColor: "#ffffffdb",
              height: "60%",
              boxShadow: "    8px 8px 8px -8px black",
            }}
          >
            <Row>
              <Col
                style={{
                  paddingTop: "2%",
                  paddingLeft: "4%",
                  fontSize: "30px",
                }}
                offset={6}
              >
                {" "}
                <i
                  style={{
                    paddingLeft: "20%",
                  }}
                >
                  Forgot Password
                </i>{" "}
                <br></br>
                <b
                  style={{
                    fontFamily: "Akaya Telivigala, cursive ",
                  }}
                >
                  {" "}
                  BaAL
                </b>
                <span
                  style={{
                    color: "#444040",
                    fontFamily: "Open Sans",
                  }}
                >
                  | Developer Portal
                </span>
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
                    boxShadow: " 8px 8px 8px -8px black",
                    height: "40px",
                    color: "gray",
                    border: "solid black 2px",
                  }}
                  placeholder="Email"
                />
              </Col>

              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "40%",
                  paddingRight: "10%",
                }}
              >
                <Button
                  block
                  type="primary"
                  onClick={sendMail}
                  style={{ fontSize: "22px", height: "55px", width: "180px" }}
                >
                  {loading && <Spin />} Send reset link
                </Button>
                <br></br> <br></br> <br></br>
              </Col>
              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "38%",
                  paddingRight: "10%",
                }}
              >
                Go back to <a href="login">login</a>.
              </Col>
            </Row>{" "}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
