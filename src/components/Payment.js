import { useState, useEffect } from "react";
import { Layout, Button, Card, Row, Col, Alert } from "antd";
import { useHistory } from "react-router-dom";
import circle from "./check-circle.svg";
import "moment-timezone";
import "leaflet/dist/leaflet.css";
import Load from "./load.svg";
import "./styles/DeveloperDashboard.css";
import React from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { setPlan } from "../redux/index";
import "./styles/Payment.css";
const { Content } = Layout;

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoader, setshowLoader] = useState(true);
  /* ------------Select data population --------------*/
  useEffect(() => {
    setTimeout(() => setshowLoader(false), 2000);
  }, []);
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
        " 2000 API hits",
        "24 X 7 Customer Support ",
        " Lorem Ipsum",
      ],
    },
    {
      plan_id: "price_1IjkdWSD8g54xptxusRN1ZqE",
      color: "rgb(147, 108, 0)",
      price: 700,
      plan: "PROFESSIONAL",
      title: "5000 API Hits",
      limit: "5000",
      description: [
        " 5000 API hits",
        "24 X 7 Customer Support ",
        " Lorem Ipsum",
      ],
    },
    {
      plan_id: "price_1IjkeESD8g54xptxj63dAL4w",
      color: "rgb(37, 134, 163)",
      price: 1500,
      plan: "ENTERPRISE",
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
        className={data[1].plan + "1"}
        key={data[0]}
        md={{ span: 6 }}
        xs={{ span: 24 }}
      >
        <Card
          className={data[1].plan}
          hoverable
          style={{ width: 450 }}
          cover={
            <div className="price-column">
              {data[1].plan == "PROFESSIONAL" ? (
                <Alert
                  className="most-popular"
                  message="MOST POPULAR"
                  type="warning"
                />
              ) : null}
              <div className="price-header">
                <div className="price">
                  <div className="rupee-sign"> ₹</div>
                  {data[1].price}
                  <div className="year-sign">/year</div>
                </div>
                <div className="plan">{data[1].plan}</div>
              </div>
              <div className="divider"></div>
            </div>
          }
        >
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ textAlign: "center" }}>
              <div className="feature">
                <img src={circle}></img>
                {data[1].description[0]}
              </div>
              <div className="feature">
                <img src={circle}></img>
                {data[1].description[1]}
              </div>
              <div className="feature">
                <img src={circle}></img>
                {data[1].description[2]}
              </div>
              <div className="feature inactive">
                <img src={circle}></img>
                {data[1].description[2]}
              </div>
              <div className="feature inactive">
                <img src={circle}></img>
                {data[1].description[2]}
              </div>
              <div className="feature inactive">
                <img src={circle}></img>
                {data[1].description[2]}
              </div>
              <Button
                className="cta"
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
      {" "}
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
        <Layout>
          <Content
            className="ca"
            style={{
              color: "#5a5a5a",
              boxShadow: "    6px 6px 8px 8px gray",
              height: "100vh",
              background: "#f8f9fb",
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
      )}
    </Layout>
  );
};

export default Payment;
