import { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button, Spin, Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "leaflet/dist/leaflet.css";
import React from "react";
import Logo from "./logo.jpg";
import "../App.css";
import { userLogin, getTransaction } from "../service/stateService";
import { login, setToken, setTransaction } from "../redux/index";
const { Content } = Layout;
const DeveloperLogin = () => {
  const history = useHistory();
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

    return history.push("/dev/home");
  };
  /* ------------View --------------*/
  return (
    <Layout>
      <Content
        className="back"
        style={{
          background:
            "linear-gradient(to right ,white 50% ,  rgb(147, 197, 114) 50% )",
          height: "100vh",
        }}
      >
        <Row>
          <Col
            md={12}
            xs={24}
            style={{
              marginTop: "10%",
              height: "60%",
            }}
          >
            <Row>
              <Col
                className="headings"
                xs={24}
                md={{ offset: 6 }}
                style={{
                  paddingTop: "2%",
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "rgb(147, 197, 114)",
                }}
              >
                {" "}
                Sign in to{" "}
                <b
                  style={{
                    fontFamily: "Akaya Telivigala, cursive ",
                  }}
                >
                  {" "}
                  BaAL
                </b>
                <span
                  className="titles"
                  style={{
                    color: "#444040",
                    fontFamily: "Open Sans",
                    fontSize: "1.5rem",
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
                  className="in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setError(false)}
                  style={{
                    height: "50px",
                    color: "gray",
                    borderRadius: "15px",
                    backgroundColor: "#eeeeee !important",
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
                  className="in"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setError(false)}
                  style={{
                    height: "50px",
                    color: "gray",
                    backgroundColor: "#eeeeee !important",
                    borderRadius: "15px",
                  }}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Col>
              <Col offset={9}>
                <br></br>
                <br></br>
                <a
                  className="titles"
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  href="forgotPass"
                >
                  Forgot Password?
                </a>
              </Col>
              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "35%",
                  paddingRight: "10%",
                }}
              >
                <Button
                  className="update"
                  type="primary"
                  onClick={handleLogin}
                  style={{
                    fontSize: "1.5rem",
                    height: "55px",
                    width: "250px",
                    borderRadius: "25px",
                    backgroundColor: "rgb(147, 197, 114)",
                    border: "solid rgb(147, 197, 114)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {loading && <Spin />} Sign In
                </Button>
              </Col>
              <Col
                className="titles"
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "25%",
                  paddingRight: "10%",
                  fontSize: "1.5rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                New to Developer's portal?{" "}
                <a href="register" style={{ color: "rgb(147, 197, 114)" }}>
                  Register Here{" "}
                </a>
                .
              </Col>
            </Row>{" "}
          </Col>
          <Col
            md={12}
            xs={0}
            style={{
              marginTop: "10%",
              height: "60%",
            }}
          >
            <Row>
              <Col span={24} style={{ paddingLeft: "25%" }}>
                <img
                  onClick={() => history.push("/")}
                  style={{
                    cursor: "pointer",
                    boxShadow: " 8px 8px 8px -8px black",
                    opacity: "0.9",
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
