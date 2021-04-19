import { useState, useEffect } from "react";
import { Layout, Avatar, Row, Col, Input, Menu, Button, Space } from "antd";
import "leaflet/dist/leaflet.css";
import React from "react";
import Logo from "./logo.jpg";
import { GithubFilled, SkypeFilled, FacebookFilled } from "@ant-design/icons";
import "./App.css";
import { getAPI } from "./service/stateService";
const { Header, Footer, Content, Sider } = Layout;
const Developer = () => {
  /* ------------Select data population --------------*/
  const [menu, setMenu] = useState(1);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const onSubscribe = async () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email == "" || !pattern.test(email)) {
      setError(true);
      return;
    }
    console.log(email);
    let data = await getAPI(email);
    if (
      data == undefined ||
      data.headers["content-type"] == "application/json; charset=utf-8"
    ) {
      setError(true);
      return;
    }
    console.log(data);
    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "BaAL-API.zip");
    document.body.appendChild(link);
    link.click();
    console.log(data.headers["content-type"]);
  };
  /* ------------View --------------*/
  return (
    <Layout style={{ backgroundColor: "black" }}>
      <Header
        style={{
          backgroundColor: "#93C572",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {" "}
        <Row className="logo" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {" "}
          <Col md={8} xs={24}>
            <Avatar size={60} src={Logo} /> BaAL{" "}
            <span
              style={{
                color: "gray",
                fontFamily: "Open Sans",
                fontSize: "19px",
              }}
            >
              | Developer Portal
            </span>
          </Col>
          <Col className="gutter-row" md={16}>
            {" "}
            Bank and ATM Location Finder{" "}
            <span
              style={{
                color: "#5d5858",
                fontFamily: "Open Sans",
                fontSize: "19px",
              }}
            >
              | API documentation
            </span>
            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <a href="/" style={{ color: "black", fontSize: "25px" }}>
              Go to Main &nbsp; &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="black"
                className="bi bi-chevron-double-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </a>
          </Col>
        </Row>{" "}
      </Header>
      <Layout style={{ padding: "70px" }}>
        <Layout>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            onSelect={(e, i) => setMenu(e.key)}
          >
            <Menu.Item
              style={{
                fontSize: "30px",
                borderBottom: "solid gray 1px",
                fontFamily: "Akaya Telivigala, cursive",
                color: "white",
              }}
              key="1"
            >
              <u> Getting Started</u>
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: "30px",
                borderBottom: "solid gray 1px",
                fontFamily: "Akaya Telivigala, cursive",
                color: "white",
              }}
              key="2"
            >
              <u> API Documentation </u>{" "}
            </Menu.Item>
          </Menu>
        </Layout>
        <Content
          style={{
            color: "#5a5a5a",
            backgroundColor: "rgb(252, 251, 233)",
          }}
        >
          <Row
            style={{
              color: "gray",
              fontFamily: "Amaranth",
            }}
          >
            <Col
              md={{ offset: 10 }}
              xs={{ offset: 5 }}
              style={{ padding: "10px", fontSize: "35px" }}
            >
              BaAL API Reference
            </Col>
          </Row>
          {menu == "1" ? (
            <Row>
              <h1 style={{ color: "#4a4747" }}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="24"
                  fill="black"
                  className="bi bi-disc-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z" />
                </svg>{" "}
                <u> GETTING STARTED</u>
              </h1>
              <Row
                style={{
                  color: "white",
                  fontSize: "21px",
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontFamily: "Arial",
                  border: "double black 7px",
                  width: "100%",
                  height: "260px",
                  textAlign: "center",
                }}
              >
                <Col
                  md={20}
                  xs={7}
                  style={{ color: "black", fontWeight: "bolder" }}
                >
                  1 ) Subscribe to recieve your API key and API collection kit :
                </Col>
                <Col xs={22} md={15} offset={6}>
                  <Input
                    placeholder="Email ID"
                    onFocus={() => setError(false)}
                    onChange={(e) => setEmail(e.target.value)}
                    size={"large"}
                  ></Input>
                </Col>
                <Col xs={22} md={9} offset={8}>
                  <Button
                    type="primary"
                    shape="round"
                    onClick={onSubscribe}
                    style={{ height: "40px", fontSize: "20px", width: "280px" }}
                  >
                    Subscribe
                  </Button>
                  {error && (
                    <span style={{ color: "red", fontSize: "18px" }}>
                      &nbsp; Invalid Email !
                    </span>
                  )}
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  2 ) A zipped file will be downloaded which will consist of the
                  API collection in "json" format
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="zipped "
                    src={process.env.PUBLIC_URL + "/file.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",

                    textAlign: "center",
                  }}
                >
                  Fig 1.1 : Sample image of the downloaded Zip file
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  3 ) You will also recieve an email on the subscribed email ID
                  with your API authentication key
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="email "
                    src={process.env.PUBLIC_URL + "/email.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",
                  }}
                >
                  Fig 1.2 : Sample E-mail recieved upon subscription
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  4 ) Open{" "}
                  <a href="https://www.postman.com/">
                    Postman{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-link-45deg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                    </svg>
                  </a>
                  and click on "import" to import the downloaded collection
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="email "
                    src={process.env.PUBLIC_URL + "/import.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",
                  }}
                >
                  Fig 1.3 : Import section in Postman
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  5 ) In the opened window , drag and drop the extracted "json
                  file" from the zipped folder
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="email "
                    src={process.env.PUBLIC_URL + "/collection.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",
                  }}
                >
                  Fig 1.4 : Collection import section in Postman
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "90px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  6 ) Once the file is uploaded , click on "Import "
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="email "
                    src={process.env.PUBLIC_URL + "/collectionImport.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",
                  }}
                >
                  Fig 1.5 : Import section in Postman
                </Col>
              </Row>
              <Row
                style={{
                  paddingTop: "19px",
                  paddingBottom: "19px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  fontSize: "21px",
                  fontFamily: "Arial",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <Col span={24} style={{ fontWeight: "bolder" }}>
                  7) The imported collection is located in "Collections tab"
                </Col>
                <Col span={24}>
                  <img
                    width={800}
                    alt="email "
                    src={process.env.PUBLIC_URL + "/imported.png"}
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    fontSize: "19px",
                    color: "brown",
                    fontFamily: "arial",
                  }}
                >
                  Fig 1.5 : Imported collection in Postman
                </Col>
              </Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <Space direction={"vertical"} size={15}>
                  <h3>
                    {" "}
                    You are good to go ! Please refer to the API documentation
                    for more details ,
                  </h3>

                  <h2>
                    {" "}
                    <span style={{ fontFamily: "Akaya Telivigala, cursive" }}>
                      Team BaAL
                    </span>
                  </h2>
                </Space>
              </Col>
            </Row>
          ) : (
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#ffffff70",
                padding: "14px",
              }}
            >
              <Space
                direction={"vertical"}
                style={{
                  padding: "22px",
                  border: "groove gray 5px",
                  textAlign: "center",
                }}
                size={375}
              >
                <Row style={{ textAlign: "left", padding: "3px" }}>
                  <Col span={24}>
                    <h1
                      style={{
                        fontSize: "40px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Index</u>
                    </h1>
                  </Col>
                  <a
                    href="#"
                    id="toTopBtn"
                    title="Back to top"
                    className="cd-top text-replace js-cd-top cd-top--is-visible cd-top--fade-out"
                  ></a>
                  <Col
                    span={24}
                    style={{ fontSize: "30px", fontWeight: "bolder" }}
                  >
                    <a
                      title="Prerequisites"
                      href="#_Toc60330283"
                      style={{ color: "#4c4c4c" }}
                    >
                      1. Prerequisites{" "}
                    </a>
                  </Col>
                  <br></br>
                  <Col
                    span={24}
                    style={{ fontSize: "30px", fontWeight: "bolder" }}
                  >
                    <a
                      title="States"
                      href="#_Toc60330284"
                      style={{ color: "#4c4c4c" }}
                    >
                      2. Get States API{" "}
                    </a>
                  </Col>{" "}
                  <br></br>
                  <Col
                    span={24}
                    style={{ fontSize: "30px", fontWeight: "bolder" }}
                  >
                    <a
                      title="Cities"
                      href="#_Toc60330285"
                      style={{ color: "#4c4c4c" }}
                    >
                      3. Get Cities API{" "}
                    </a>
                  </Col>{" "}
                  <br></br>
                  <Col
                    span={24}
                    style={{ fontSize: "30px", fontWeight: "bolder" }}
                  >
                    <a
                      title="Banks"
                      href="#_Toc60330286"
                      style={{ color: "#4c4c4c" }}
                    >
                      4. Get Banks API{" "}
                    </a>
                  </Col>{" "}
                  <br></br>
                  <Col
                    span={24}
                    style={{ fontSize: "30px", fontWeight: "bolder" }}
                  >
                    <a
                      title="Search"
                      href="#_Toc60330287 "
                      style={{ color: "#4c4c4c" }}
                    >
                      5. Post Search API{" "}
                    </a>
                  </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <Col span={24}>
                    <a name="_Toc60330283"></a>
                    <h1
                      style={{
                        fontSize: "32px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Prerequisites</u>
                    </h1>
                  </Col>

                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    <h3>
                      {" "}
                      All api calls should be made by making the following
                      changes in header:
                    </h3>{" "}
                    Authorization type :{" "}
                    <span onClick={() => setMenu(1)}>
                      {" "}
                      <i>Bearer Token </i>{" "}
                    </span>{" "}
                    <br></br>
                    Token : YOUR_API_TOKEN
                  </Col>
                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    <br></br>
                    <img
                      width={1000}
                      height={450}
                      alt="bearer "
                      src={process.env.PUBLIC_URL + "/bearer.png"}
                    ></img>
                  </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <a name="_Toc60330284"></a>
                  <Col span={24}>
                    <h1
                      style={{
                        fontSize: "32px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Get States API</u>
                    </h1>
                  </Col>

                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    API :{" "}
                    <a href="https://baal.herokuapp.com/states">
                      https://baal.herokuapp.com/states
                    </a>
                    <br></br>
                    <img
                      width={800}
                      alt="states "
                      src={process.env.PUBLIC_URL + "/getStates.png"}
                    ></img>
                    <br></br>
                    This API gives the information of all states in a country ,
                    <b>Currently limited to India</b>
                  </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <a name="_Toc60330285"></a>
                  <Col span={24}>
                    <h1
                      style={{
                        fontSize: "32px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Get Cities API</u>
                    </h1>
                  </Col>

                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    API :{" "}
                    <a href="https://baal.herokuapp.com/cities/2">
                      https://baal.herokuapp.com/cities/:state_id
                    </a>
                    <br></br>
                    <img
                      width={800}
                      alt="states "
                      src={process.env.PUBLIC_URL + "/getCities.png"}
                    ></img>
                    <br></br>
                    This API gives the information of all cities , based on the
                    state id
                  </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <a name="_Toc60330286"></a>
                  <Col span={24}>
                    <h1
                      style={{
                        fontSize: "32px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Get Banks API</u>
                    </h1>
                  </Col>

                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    API :{" "}
                    <a href="https://baal.herokuapp.com/banks">
                      https://baal.herokuapp.com/banks
                    </a>
                    <br></br>
                    <img
                      width={800}
                      alt="states "
                      src={process.env.PUBLIC_URL + "/getBanks.png"}
                    ></img>
                    <br></br>
                    This API gives the information of all banks in a country
                  </Col>
                </Row>

                <Row style={{ textAlign: "center" }}>
                  <a name="_Toc60330287"></a>
                  <Col span={24}>
                    <h1
                      style={{
                        fontSize: "32px",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                      }}
                    >
                      {" "}
                      <u>Post Search API</u>
                    </h1>
                  </Col>

                  <Col
                    span={24}
                    style={{ fontSize: "23px", fontWeight: "bolder" }}
                  >
                    API :{" "}
                    <a href="https://baal.herokuapp.com/search">
                      https://baal.herokuapp.com/search
                    </a>
                    <br></br>
                    <img
                      width={800}
                      alt="states "
                      src={process.env.PUBLIC_URL + "/search.png"}
                    ></img>
                    <br></br>
                    This API gives the information of all banks that meet the
                    keyword criteria specified
                  </Col>
                </Row>
              </Space>
            </div>
          )}
        </Content>
      </Layout>
      <Footer
        style={{ backgroundColor: "#93C572", height: "150px", color: "white" }}
      >
        <Row>
          <Col
            style={{ color: "black", fontSize: "30px" }}
            xs={{ offset: 8 }}
            md={{ offset: 12 }}
          >
            <GithubFilled />
            <SkypeFilled />
            <FacebookFilled />
          </Col>
          <Col
            xs={{ offset: 1 }}
            sm={{ offset: 7 }}
            md={{ offset: 10 }}
            style={{
              color: "rgb(211 84 94 / 99%)",
              fontSize: "21px",
              fontWeight: "bold",
            }}
          >
            Copyright &copy; Prachita Nayak | 2021
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Developer;
