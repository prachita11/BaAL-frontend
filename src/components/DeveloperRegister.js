import { useState, useEffect } from "react";
import { Layout, Row, Col, Input, Button, Spin, Avatar } from "antd";
import "leaflet/dist/leaflet.css";
import { useHistory } from "react-router-dom";
import React from "react";
import Logo from "./logo.jpg";
import Load from "./load.svg";
import "../App.css";
import { useDispatch } from "react-redux";
import { register } from "../service/stateService";
import { login, setToken } from "../redux/index";
const { Content } = Layout;
const DeveloperRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  /* ------------Select data population --------------*/
  const [showLoader, setshowLoader] = useState(true);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setshowLoader(false), 2000);
  }, []);
  const onSubscribe = async () => {
    setLoading(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var namePattern = new RegExp(/^[A-Z ]+$/i);
    if (
      email == "" ||
      !pattern.test(email) ||
      name == "" ||
      !namePattern.test(name) ||
      password == ""
    ) {
      setError(true);
      setLoading(false);
      return;
    }
    let user = {
      name: name,
      email: email,
      password: password,
    };

    let data = await register(user);
    setLoading(false);
    setEmail("");
    setName("");
    setPassword("");

    if (data.error == true) {
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
    <Layout style={{ height: "100vh" }}>
      {showLoader ? (
        <Row style={{ height: "100vh" }}>
          <Col
            style={{ paddingTop: "15%" }}
            md={{ span: 14, offset: 10 }}
            xs={{ span: 10, offset: 9 }}
          >
            <img className="loader" src={Load}></img>
          </Col>
        </Row>
      ) : (
        <Content
          className="back"
          style={{
            background:
              "linear-gradient(to right ,white 50% ,  rgb(147, 197, 114) 50% )",
            height: "100vh",
          }}
        >
          <Row style={{ height: "100%" }}>
            <Col
              md={12}
              xs={24}
              style={{
                marginTop: "10%",
                height: "60%",
              }}
            >
              {" "}
              <Col
                className="headings"
                style={{
                  paddingTop: "2%",
                  fontSize: "3rem",
                  color: "rgb(147, 197, 114)",
                  fontWeight: "bolder",
                  fontFamily: "Poppins, sans-serif",
                }}
                offset={5}
              >
                {" "}
                Register
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
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  | Developer Portal
                </span>
              </Col>
              <Col
                span={24}
                style={{
                  paddingTop: "8%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              >
                {error && (
                  <span style={{ color: "red", textAlign: "center" }}>
                    {" "}
                    Please check your input and try again !
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
                  value={name}
                  required
                  onFocus={() => setError(false)}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    color: "gray",
                  }}
                  placeholder="Name "
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
                <Input
                  required
                  value={email}
                  onFocus={() => setError(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    color: "gray",
                  }}
                  placeholder="Email "
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
                <Input
                  onKeyPress={(e) => (e.key === "Enter" ? onSubscribe() : null)}
                  required
                  onFocus={() => setError(false)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    color: "gray",
                  }}
                  placeholder="Password"
                />
                <br></br>
                <br></br>
              </Col>
              <Col
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "27%",
                  paddingRight: "10%",
                }}
              >
                <Button
                  className="update"
                  type="primary"
                  onClick={onSubscribe}
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    borderRadius: "25px",
                    height: "55px",
                    width: "400px",
                    backgroundColor: "rgb(147, 197, 114)",
                    border: "rgb(147, 197, 114)",
                  }}
                >
                  {loading && <Spin />} Register
                </Button>
              </Col>
              <Col
                className="titles"
                span={24}
                style={{
                  paddingTop: "2%",
                  paddingLeft: "30%",
                  paddingRight: "10%",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                Already have an account ?{" "}
                <a href="login" style={{ color: "rgb(147, 197, 114)" }}>
                  Sign In{" "}
                </a>{" "}
                .
              </Col>{" "}
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
                    style={{
                      boxShadow: " 8px 8px 8px -8px black",
                      opacity: "0.8",
                    }}
                    src={process.env.PUBLIC_URL + "/signup1.jpeg"}
                    width={"70%"}
                  ></img>
                </Col>
                <Col
                  span={24}
                  onClick={() => history.push("/")}
                  style={{ paddingLeft: "17%", cursor: "pointer" }}
                >
                  <Avatar src={Logo} size={125}></Avatar>
                  <b
                    style={{
                      fontFamily: "Akaya Telivigala, cursive ",
                      color: "white",
                      fontSize: "84px",
                    }}
                  >
                    {" "}
                    BaAL
                  </b>
                  <span
                    style={{
                      color: "#444040",
                      fontFamily: "Open Sans",
                      fontSize: "39px",
                    }}
                  >
                    | Developer Portal
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      )}
    </Layout>
  );
};

export default DeveloperRegister;
