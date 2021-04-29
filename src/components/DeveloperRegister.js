import { useState, useEffect } from "react";
import {
  Layout,
  Avatar,
  Row,
  Col,
  Form,
  Input,
  Button,
  Space,
  Spin,
  Divider,
} from "antd";
import "leaflet/dist/leaflet.css";
import React from "react";
import Logo from "./logo.jpg";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../service/stateService";
import { login, setToken, setTransaction } from "../redux/index";
const { Content } = Layout;
const DeveloperRegister = () => {
  const dispatch = useDispatch();
  /* ------------Select data population --------------*/
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    <Layout>
      <Content style={{ backgroundColor: "#93C572", height: "100vh" }}>
        <Row style={{ height: "100%" }}>
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
            {" "}
            <Col
              style={{
                paddingTop: "2%",
                fontSize: "40px",
              }}
              offset={10}
            >
              {" "}
              Register <br></br>
            </Col>
            <Col
              span={24}
              offset={8}
              style={{
                fontSize: "100%",
              }}
            >
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
                  boxShadow: " 8px 8px 8px -8px black",
                  height: "40px",
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
                  boxShadow: " 8px 8px 8px -8px black",
                  height: "40px",
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
                required
                onFocus={() => setError(false)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  boxShadow: " 8px 8px 8px -8px black",
                  height: "40px",
                  color: "gray",
                }}
                placeholder="Password"
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
                type="primary"
                onClick={onSubscribe}
                style={{ fontSize: "22px", height: "55px", width: "180px" }}
              >
                {loading && <Spin />} Register
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
              Already have an account ? <a href="login">Log In Here</a> .
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
                  }}
                  src={Logo}
                  width={300}
                ></img>
              </Col>
              <Col span={24} style={{ paddingLeft: "17%" }}>
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
    </Layout>
  );
};

export default DeveloperRegister;
