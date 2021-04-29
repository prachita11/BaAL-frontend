import { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button, Spin, Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import "leaflet/dist/leaflet.css";
import React from "react";
import Logo from "./logo.jpg";
import "../App.css";
import { userLogin, getTransaction } from "../service/stateService";
import { login, setToken, setTransaction } from "../redux/index";
const { Content } = Layout;
const DeveloperLogin = () => {
  /* ------------Select data population --------------*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setLoading(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (email == "" || !pattern.test(email) || password == "") {
      setError(true);
      setLoading(false);
      return;
    }
    let user = {
      email: email,
      password: password,
    };

    let data = await userLogin(user);

    setEmail("");
    setPassword("");
    if (data.error == true) {
      setLoading(false);
      setError(true);
      return;
    }

    dispatch(login(data.data));
    dispatch(setToken(data.token));
    setTimeout(() => {
      setLoading(false);
      return window.location.replace("/dev/home");
    }, 3000);
  };
  /* ------------View --------------*/
  return (
    <Layout>
      <Content style={{ backgroundColor: "#93C572", height: "100vh" }}>
        <Row>
          <Col
            md={12}
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
                xs={24}
                md={{ offset: 6 }}
                style={{
                  paddingTop: "2%",
                  fontSize: "30px",
                }}
              >
                {" "}
                Log In to{" "}
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
                    Invalid Credentials!
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
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setError(false)}
                  style={{
                    height: "40px",
                    color: "gray",
                  }}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Col>
              <Col offset={17}>
                <a href="forgotPass">Forgot Password?</a>
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
                  type="primary"
                  onClick={handleLogin}
                  style={{ fontSize: "22px", height: "55px", width: "180px" }}
                >
                  {loading && <Spin />} Log In
                </Button>
              </Col>
              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "30%",
                  paddingRight: "10%",
                }}
              >
                New to Developer's portal? <a href="register">Register Here </a>
                .
              </Col>
            </Row>{" "}
          </Col>
          <Col
            md={12}
            xs={24}
            style={{
              marginTop: "10%",
              height: "60%",
            }}
          >
            <Row>
              <Col span={24} style={{ paddingLeft: "25%" }}>
                <Image
                  style={{
                    boxShadow: " 8px 8px 8px -8px black",
                  }}
                  src={Logo}
                  width={"80%"}
                />
              </Col>
              <Col span={24} style={{ paddingLeft: "27%" }}>
                <b
                  style={{
                    fontFamily: "Akaya Telivigala, cursive ",
                    color: "white",
                    fontSize: "190%",
                  }}
                >
                  {" "}
                  BaAL
                </b>
                <span
                  style={{
                    color: "#444040",
                    fontFamily: "Open Sans",
                    fontSize: "160%",
                  }}
                >
                  | Developer Portal
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DeveloperLogin;
