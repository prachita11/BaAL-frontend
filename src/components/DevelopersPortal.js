import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Layout, Avatar, Row, Col, Image, Menu, Button, Space } from "antd";
import "leaflet/dist/leaflet.css";
import "./styles/DeveloperDashboard.css";
import React from "react";
import Logo from "./logo.jpg";
import {
  GithubFilled,
  SkypeFilled,
  FacebookFilled,
  RightCircleOutlined,
} from "@ant-design/icons";
import "../App.css";

const { Header, Footer, Content, Sider } = Layout;
const Developer = () => {
  const history = useHistory();
  /* ------------Select data population --------------*/
  const [menu, setMenu] = useState(1);

  /* ------------View --------------*/
  return (
    <Layout>
      <Row>
        <Col
          md={7}
          xs={24}
          style={{
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              borderRight: "inset rgb(147, 197, 114) 4px",
            }}
          >
            <Avatar src={Logo} size={125}></Avatar>
            <Col
              className="logo"
              style={{
                fontSize: "3.95rem",
                color: "rgb(147, 197, 114)",
                fontWeight: "bold",
              }}
            >
              {" "}
              BaAL
              <span
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                {" "}
                | Developer Portal
              </span>
            </Col>
            <Col
              span={24}
              style={{
                textAlign: "center",
              }}
            >
              <span
                onClick={() => history.push("/dev/login")}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  color: "rgb(147, 197, 114)",
                  fontWeight: "bold",
                  fontSize: "1.55rem",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                {" "}
                Sign In{" "}
              </span>
              <b
                style={{
                  color: "gray",
                }}
              >
                or{" "}
              </b>{" "}
              <span
                onClick={() => history.push("/dev/register")}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  color: "rgb(147, 197, 114)",
                  fontWeight: "bold",
                  fontSize: "1.55rem",
                  fontFamily: "Poppins,sans-serif",
                }}
              >
                {" "}
                Sign Up
              </span>
            </Col>
          </div>
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            style={{
              height: "100%",
              width: "100%",
            }}
            onSelect={(e, i) => setMenu(e.key)}
          >
            {" "}
            <Menu.Item
              className="headings"
              style={{
                fontSize: "130%",
                borderBottom: "solid gray 1px",
                fontFamily: "Poppins, sans-serif ",
                color: "white",
              }}
              key="1"
            >
              Getting Started
            </Menu.Item>
            <Menu.Item
              className="headings"
              style={{
                fontSize: "130%",
                borderBottom: "solid gray 1px",
                fontFamily: "Poppins, sans-serif ",
                color: "white",
              }}
              key="2"
            >
              API Documentation{" "}
            </Menu.Item>
          </Menu>
        </Col>

        <Col md={17} xs={24}>
          <Layout style={{ backgroundColor: "rgb(246 246 246 / 0%)" }}>
            {" "}
            <Content
              style={{
                color: "#5a5a5a",
                backgroundColor: "white",
              }}
            >
              <Row
                style={{
                  color: "gray",
                  fontFamily: "Poppins, sans-serif ",
                  color: "black",
                }}
              >
                <Col
                  className="headings"
                  md={{ offset: 10 }}
                  style={{
                    padding: "10px",
                    fontSize: "2.35rem",
                    fontWeight: "bold",
                    color: "rgb(127, 162, 93)",
                    fontFamily: "Poppins , sans-serif",
                  }}
                >
                  BaAL API Reference
                </Col>
              </Row>
              {menu == "1" ? (
                <Row>
                  <h1
                    className="headings"
                    style={{
                      color: "#4a4747",
                      fontFamily: "Poppins, sans-serif ",
                      fontWeight: "bold",
                      fontSize: "2.05rem",
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-award"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                    </svg>
                    GETTING STARTED
                  </h1>
                  <div className="divider"></div>
                  <Row
                    style={{
                      color: "white",

                      fontSize: "1.5rem",
                      paddingTop: "19px",
                      paddingBottom: "19px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      fontFamily: "Poppins, sans-serif ",
                      borderRadius: "25px",

                      width: "100%",
                      height: "260px",
                      textAlign: "center",
                    }}
                  >
                    <Col
                      className="titles"
                      md={20}
                      xs={24}
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      1 ) Subscribe to recieve your API key and API collection
                      kit :
                    </Col>
                    <Col
                      xs={{ span: 22, offset: 0 }}
                      md={{ span: 9, offset: 8 }}
                    >
                      <Button
                        className="update"
                        type="primary"
                        shape="round"
                        onClick={() => window.location.replace("/dev/login")}
                        style={{
                          height: "50%",
                          fontSize: "2.0rem",
                          width: "80%",
                          backgroundColor: "#7FA25D",

                          color: "white",
                        }}
                      >
                        Get Started <RightCircleOutlined />
                      </Button>
                    </Col>
                  </Row>
                  <div className="divider"></div>
                  <Row
                    style={{
                      fontSize: "21px",

                      fontFamily: "Poppins, sans-serif ",
                      color: "black",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Col
                      className="titles"
                      md={24}
                      xs={24}
                      style={{ fontWeight: "bolder" }}
                    >
                      <br></br>
                      <br></br>
                      After Registering , you will get free 1000 api hits and be
                      able to download the api collection
                    </Col>
                    <Col md={24} xs={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="zipped "
                        src={process.env.PUBLIC_URL + "/register.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",

                        textAlign: "center",
                      }}
                    >
                      Click on "Download API collection to download the
                      collection Zip file"
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{ fontWeight: "bolder" }}
                    >
                      <br></br> <br></br>You can also choose our paid yearly
                      subscription plans to get additional API limits
                    </Col>
                    <Col span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="zipped "
                        src={process.env.PUBLIC_URL + "/plans.png"}
                      />{" "}
                      <br></br> <br></br>
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                        textAlign: "center",
                      }}
                    >
                      Click <a href="dev/plan"> here</a> to choose from our
                      Subscription plans ! <br></br> <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontWeight: "bolder",
                      }}
                    >
                      2 ) A zipped file will be downloaded which will consist of
                      the API collection in "json" format
                    </Col>
                    <Col span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="zipped "
                        src={process.env.PUBLIC_URL + "/file.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",

                        textAlign: "center",
                      }}
                    >
                      Fig 1.1 : Sample image of the downloaded Zip file
                      <br></br> <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontWeight: "bolder",
                      }}
                    >
                      <br></br> <br></br>3 ) You will also recieve an email on
                      the subscribed email ID with your API authentication key
                    </Col>
                    <Col span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="email "
                        src={process.env.PUBLIC_URL + "/email.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                    >
                      Fig 1.2 : Sample E-mail recieved upon subscription{" "}
                      <br></br> <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{ fontWeight: "bolder" }}
                    >
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
                    <Col className="titles" span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="email "
                        src={process.env.PUBLIC_URL + "/import.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                    >
                      Fig 1.3 : Import section in Postman <br></br> <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{ fontWeight: "bolder" }}
                    >
                      5 ) In the opened window , drag and drop the extracted
                      "json file" from the zipped folder
                    </Col>
                    <Col span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="email "
                        src={process.env.PUBLIC_URL + "/collection.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                    >
                      Fig 1.4 : Collection import section in Postman <br></br>{" "}
                      <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{ fontWeight: "bolder" }}
                    >
                      6 ) Once the file is uploaded , click on "Import "
                    </Col>
                    <Col span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="email "
                        src={process.env.PUBLIC_URL + "/collectionImport.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                    >
                      Fig 1.5 : Import section in Postman <br></br> <br></br>
                      <div className="divider"></div>
                    </Col>

                    <Col
                      className="titles"
                      span={24}
                      style={{ fontWeight: "bolder" }}
                    >
                      7) The imported collection is located in "Collections tab"
                    </Col>
                    <Col className="titles" span={24} style={{ padding: "2%" }}>
                      <Image
                        style={{
                          boxShadow: "0 3px 12px rgb(52 31 97 / 89%)",
                          borderRadius: "25px",
                        }}
                        className="doc"
                        width={"45%"}
                        alt="email "
                        src={process.env.PUBLIC_URL + "/imported.png"}
                      />
                    </Col>
                    <Col
                      className="titles"
                      span={24}
                      style={{
                        fontSize: "19px",
                        color: "brown",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                    >
                      Fig 1.5 : Imported collection in Postman <br></br>{" "}
                      <br></br>
                      <div className="divider"></div>
                    </Col>
                  </Row>
                  <Col
                    className="titles"
                    span={24}
                    style={{ textAlign: "center" }}
                  >
                    <Space direction={"vertical"} size={15}>
                      <h3>
                        {" "}
                        You are good to go ! Please refer to the API
                        documentation for more details ,
                      </h3>

                      <h2>
                        {" "}
                        <span
                          style={{ fontFamily: "Akaya Telivigala, cursive" }}
                        >
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
                    padding: "3%",
                  }}
                >
                  <Space
                    direction={"vertical"}
                    style={{
                      padding: "1%",
                      border: "groove gray 5px",
                      textAlign: "center",
                      width: "100%",
                    }}
                    size={375}
                  >
                    <Row style={{ textAlign: "left" }}>
                      <Col span={24}>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
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
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                        }}
                      >
                        <a
                          title="Prerequisites"
                          href="#_Toc60330283"
                          style={{
                            color: "#4c4c4c",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          1. Prerequisites{" "}
                        </a>
                      </Col>
                      <br></br>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                        }}
                      >
                        <a
                          title="States"
                          href="#_Toc60330284"
                          style={{
                            color: "#4c4c4c",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          2. Get States API{" "}
                        </a>
                      </Col>{" "}
                      <br></br>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                        }}
                      >
                        <a
                          title="Cities"
                          href="#_Toc60330285"
                          style={{
                            color: "#4c4c4c",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          3. Get Cities API{" "}
                        </a>
                      </Col>{" "}
                      <br></br>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                        }}
                      >
                        <a
                          title="Banks"
                          href="#_Toc60330286"
                          style={{
                            color: "#4c4c4c",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          4. Get Banks API{" "}
                        </a>
                      </Col>{" "}
                      <br></br>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                        }}
                      >
                        <a
                          title="Search"
                          href="#_Toc60330287 "
                          style={{
                            color: "#4c4c4c",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          5. Post Search API{" "}
                        </a>
                      </Col>
                      <Col span={24}>
                        <a name="_Toc60330283"></a>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          {" "}
                          <u>Prerequisites</u>
                        </h1>
                      </Col>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
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
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
                      >
                        <br></br>
                        <Image
                          className="doc2"
                          width={"45%"}
                          alt="bearer "
                          src={process.env.PUBLIC_URL + "/bearer.png"}
                        />
                      </Col>
                      <a name="_Toc60330284"></a>
                      <Col span={24}>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          {" "}
                          <u>Get States API</u>
                        </h1>
                      </Col>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
                      >
                        API :{" "}
                        <a href="https://baal.herokuapp.com/states">
                          https://baal.herokuapp.com/states
                        </a>
                        <br></br>
                        <Image
                          className="doc2"
                          width={"45%"}
                          alt="states "
                          src={process.env.PUBLIC_URL + "/getStates.png"}
                        />
                        <br></br>
                        This API gives the information of all states in a
                        country ,<b>Currently limited to India</b>
                      </Col>
                      <a name="_Toc60330285"></a>
                      <Col span={24}>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          {" "}
                          <u>Get Cities API</u>
                        </h1>
                      </Col>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "80%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
                      >
                        API :{" "}
                        <a href="https://baal.herokuapp.com/cities/2">
                          https://baal.herokuapp.com/cities/:state_id
                        </a>
                        <br></br>
                        <Image
                          className="doc2"
                          width={"45%"}
                          alt="states "
                          src={process.env.PUBLIC_URL + "/getCities.png"}
                        />
                        <br></br>
                        This API gives the information of all cities , based on
                        the state id
                      </Col>
                      <a name="_Toc60330286"></a>
                      <Col span={24}>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          {" "}
                          <u>Get Banks API</u>
                        </h1>
                      </Col>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
                      >
                        API :{" "}
                        <a href="https://baal.herokuapp.com/banks">
                          https://baal.herokuapp.com/banks
                        </a>
                        <br></br>
                        <Image
                          className="doc2"
                          width={"45%"}
                          alt="states "
                          src={process.env.PUBLIC_URL + "/getBanks.png"}
                        />
                        <br></br>
                        This API gives the information of all banks in a country
                      </Col>
                      <a name="_Toc60330287"></a>
                      <Col span={24}>
                        <h1
                          className="titles"
                          style={{
                            fontSize: "130%",
                            backgroundColor: "rgba(211, 84, 94, 0.99)",
                            color: "white",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          {" "}
                          <u>Post Search API</u>
                        </h1>
                      </Col>
                      <Col
                        className="titles"
                        span={24}
                        style={{
                          fontSize: "100%",
                          fontWeight: "bolder",
                          textAlign: "center",
                          fontFamily: "Poppins,sans-serif",
                        }}
                      >
                        API :{" "}
                        <a href="https://baal.herokuapp.com/search">
                          https://baal.herokuapp.com/search
                        </a>
                        <br></br>
                        <Image
                          className="doc2"
                          width={"45%"}
                          alt="states "
                          src={process.env.PUBLIC_URL + "/search.png"}
                        />
                        <br></br>
                        This API gives the information of all banks that meet
                        the keyword criteria specified
                      </Col>
                    </Row>
                  </Space>
                </div>
              )}
            </Content>
            <Footer
              style={{
                backgroundColor: "white",
                height: "150px",
                color: "white",
              }}
            >
              <Row>
                <Col
                  className="headings"
                  style={{ color: "black", fontSize: "30px" }}
                  xs={{ offset: 8 }}
                  md={{ offset: 12 }}
                >
                  <GithubFilled />
                  <SkypeFilled />
                  <FacebookFilled />
                </Col>
                <Col
                  className="headings"
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
        </Col>
      </Row>
    </Layout>
  );
};

export default Developer;
