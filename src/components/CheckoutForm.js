import { useState } from "react";
import { Layout, Button, Row, Col, Input, Spin, Image } from "antd";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlan, subscribe } from "../service/stateService";
import "moment-timezone";
import "leaflet/dist/leaflet.css";
import "./styles/DeveloperDashboard.css";
import React from "react";
import "../App.css";
import Logo from "./logo.jpg";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const { Content } = Layout;

const CheckoutForm = () => {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const plan = useSelector((state) => state.plan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        border: "solid gray 2px",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  /* ------------Select data population --------------*/
  const handleSubmit = async (event) => {
    setLoading(true);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var namePattern = new RegExp(/^[A-Z ]+$/i);
    // Block native form submission.
    event.preventDefault();
    if (email == "" || name == "" || phone == "") {
      setIsError(true);
      seterrMsg("Please fill in the details !");
      setLoading(false);
      return;
    }
    if (!pattern.test(email)) {
      setIsError(true);
      setLoading(false);
      seterrMsg("Invalid Email format!");
      return;
    }
    if (!namePattern.test(name)) {
      setIsError(true);
      setLoading(false);
      seterrMsg("Invalid Name format!");
      return;
    }
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email: email,
        name: name,
        phone: phone,
      },
    });

    if (result.error) {
      return history.push("failed?error=" + result.error);
    } else {
      const res = await subscribe({
        payment_method: result.paymentMethod.id,
        email: email,
        name: name,
        plan: plan,
      });
      console.log(res);
      // eslint-disable-next-line camelcase
      const { client_secret, status, error } = res.data;
      if (error) {
        return history.push("failed?error=Card declined");
      }
      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(async function (result) {
          if (result.error) {
            console.log(result.error);
            return history.push("failed?error=" + result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            const res = await updatePlan({
              email: email,
              plan: plan.plan,
              price: plan.price,
              limit: plan.limit,
              token: auth,
            });
            if (res.error == true) {
              return history.push("failed?error=Fatal error");
            }
            return history.push("success?plan=" + plan.plan);
          }
        });
      } else {
        const res = await updatePlan({
          email: email,
          plan: plan.plan,
          price: plan.price,
          limit: plan.limit,
          token: auth,
        });

        if (res.error == true) {
          return history.push("failed?error=Fatal error");
        }
        return history.push("success?plan=" + plan.plan);
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  return (
    <Layout>
      <Layout style={{ height: "100vh" }}>
        <Content
          style={{
            color: "#5a5a5a",
            boxShadow: "    6px 6px 8px 8px gray",
            height: "100vh",
            background:
              "linear-gradient(to right bottom,  rgb(147, 197, 114) 60% ,rgb(255 252 202 / 41%)  50%)",
          }}
        >
          {" "}
          <Row
            style={{
              paddingTop: "15%",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Col md={5} xs={24}>
              <Image src={Logo} width={"70%"}></Image>
              <br></br>
              <span
                style={{
                  fontSize: "90px",
                  paddingLeft: "13%",
                  color: "white",
                  fontFamily: "Akaya Telivigala, cursive",
                }}
              >
                BaAL
              </span>
            </Col>
            <Col
              md={{ offset: 3 }}
              xs={{ span: 0 }}
              style={{ height: "300px" }}
            >
              <div
                style={{
                  height: "500px",
                  backgroundColor: "gray",
                  width: "3px",
                }}
              ></div>
            </Col>
            <Col
              md={{ span: 12, offset: 3 }}
              xs={{ span: 24 }}
              style={{
                backgroundColor: "white",
                padding: "3%",
                height: "40%",
                border: "solid gray 2px",
              }}
            >
              {isError && (
                <Col span={24}>
                  <span style={{ color: "red" }}> {errMsg}</span>
                </Col>
              )}

              <Col span={24}>
                <Input
                  onFocus={() => setIsError(false)}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
                <br></br>
                <br></br>
              </Col>

              <Col span={24}>
                <Input
                  onFocus={() => setIsError(false)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  type="email"
                />
                <br></br>
                <br></br>
              </Col>
              <Col span={24}>
                <Input
                  onFocus={() => setIsError(false)}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                  type="number"
                />
                <br></br>
                <br></br>
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: "bold" }}>
                  Subscription fee : {plan.price}
                </span>
                <br></br>
                <br></br>
              </Col>
              <Col span={24} style={{ backgroundColor: "white" }}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
                <br></br>
                <br></br>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  onClick={(e) => handleSubmit(e)}
                  block
                  disabled={!stripe}
                  style={{ fontSize: "17px" }}
                >
                  {loading && <Spin size={"large"}></Spin>} Pay
                </Button>
              </Col>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CheckoutForm;
