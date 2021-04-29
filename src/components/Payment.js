import { useState, useEffect } from "react";
import { Layout, Button, Card, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import "leaflet/dist/leaflet.css";
import "./styles/DeveloperDashboard.css";
import React from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { setPlan } from "../redux/index";
const { Content } = Layout;

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  /* ------------Select data population --------------*/
  const choosePayment = async (plan, price, limit) => {
    await dispatch(setPlan({ plan: plan, price: price, limit: limit }));
    return history.push("checkout");
  };
  let data = [
    {
      plan_id: "price_1IjkcjSD8g54xptxX67elQ2B",
      color: "rgba(146, 156, 183, 0.72)",
      price: 300,
      plan: "BASIC",
      title: "2000 API Hits",
      limit: "2000",
      description: [
        "Additional 2000 API hits",
        "24 X 7 Customer Support ",
        " Lorem Ipsum",
      ],
    },
    {
      plan_id: "price_1IjkdWSD8g54xptxusRN1ZqE",
      color: "rgb(147, 108, 0)",
      price: 700,
      plan: "STANDARD",
      title: "5000 API Hits",
      limit: "5000",
      description: [
        "Additional 5000 API hits",
        "24 X 7 Customer Support ",
        " Lorem Ipsum",
      ],
    },
    {
      plan_id: "price_1IjkeESD8g54xptxj63dAL4w",
      color: "rgb(37, 134, 163)",
      price: 1500,
      plan: "PREMIUM",
      title: "Unlimited API Hits",
      limit: "Unlimited",
      description: [
        "Unlimitied API hits",
        "24 X 7 Customer Support ",
        " Lorem Ipsum",
      ],
    },
  ];

  let plans = Object.entries(data).map((data) => {
    return (
      <Col
        key={data[0]}
        md={{ offset: 1, span: 6 }}
        xs={{ span: 24 }}
        style={{
          padding: "22px",
          backgroundColor: "white",
        }}
      >
        <Card
          hoverable
          style={{ width: 450, backgroundColor: "#80808017" }}
          cover={
            <div
              style={{
                paddingTop: "140px",
                paddingLeft: "17%",
                backgroundColor: data[1].color,
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),   linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),                        linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%)",

                backgroundSize: "13px, 29px, 37px, 53px",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  fontSize: "50px",
                  color: "rgb(99, 86, 181)",
                  fontFamily: "Georgia !important",
                  textShadow: "2px 2px #000000",
                  backgroundColor: "#ffffffa1",
                  border: "outset white 4px",
                  padding: "5px",
                }}
              >
                {" "}
                {data[1].plan}
              </span>
              <br></br>
              <br></br>
            </div>
          }
        >
          <Row style={{ width: "100%" }}>
            <Col md={12} xs={24}>
              <span
                style={{
                  fontSize: "22px",
                  color: "black",
                  fontFamily: "Open Sans",
                  fontWeight: "bolder",
                }}
              >
                {" "}
                {data[1].title}
              </span>
            </Col>
            <Col md={12} xs={24}>
              <span
                style={{
                  marginLeft: "14%",
                  fontSize: "26px",
                  color: "black",
                  fontFamily: "Open Sans",
                  fontWeight: "bolder",
                  border: "solid rgb(99, 86, 181) 5px",
                  padding: "4px",
                }}
              >
                {" "}
                ₹ {data[1].price}/year
              </span>
              <br></br>
              <br></br>
            </Col>
            <Col>
              <div>
                <ul
                  style={{
                    listStyleType: "circle",
                    color: "gray",
                    fontSize: "24px",
                    fontWeight: "bolder",
                  }}
                >
                  <li> {data[1].description[0]}</li>
                  <li> {data[1].description[1]}</li>
                  <li> {data[1].description[2]}</li>
                </ul>
              </div>
            </Col>
            <Col offset={6}>
              <Button
                type="round"
                style={{
                  fontSize: "25px",
                  height: "60px",
                  width: "190px",
                  fontFamily: "Open Sans MS",
                  fontWeight: "bolder",
                  backgroundColor: "rgb(147, 197, 114)",
                  color: "rgb(255 255 255)",
                }}
                onClick={() =>
                  choosePayment(data[1].plan_id, data[1].price, data[1].limit)
                }
              >
                {" "}
                Select Plan{" "}
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  });

  /* ------------View --------------*/
  return (
    <Layout>
      <Layout>
        <Content
          className="ca"
          style={{
            color: "#5a5a5a",
            boxShadow: "    6px 6px 8px 8px gray",
            height: "100vh",
            background:
              "linear-gradient(to right bottom,  rgb(147, 197, 114) 50% ,rgb(255 252 202 / 41%)  50%)",
          }}
        >
          <div
            style={{
              paddingTop: "1%",
              paddingLeft: "1%",
              height: "100%",
            }}
          >
            <Row>{plans}</Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Payment;
