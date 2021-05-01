import { Result, Button, Typography, Row, Col, Layout } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
const { Content } = Layout;

const FailedPage = () => {
  let location = useLocation();
  let history = useHistory();
  const [state, setstate] = useState("");
  useEffect(() => {
    let params = location.search.split("=");
    params = params[1]; // fetching the cancelled order_id from query string
    if (params == undefined) {
      history.push("login");
    } else {
      setstate(params);
    }
  }, []);
  return (
    <Layout>
      <Layout style={{ height: "100vh" }}>
        <Content
          style={{
            color: "#5a5a5a",
            height: "100vh",
            background:
              "linear-gradient(to right bottom,  rgb(147, 197, 114) 60% ,whitesmoke  50%)",
          }}
        >
          <Row
            style={{
              paddingTop: "15%",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Col
              span={24}
              style={{
                backgroundColor: "white",
                padding: "3%",
                height: "480px",
                borderRadius: "25px",
                boxShadow: "0 7px 30px rgba(52, 31, 97, 1.1)",
              }}
            >
              <Result
                style={{ fontFamily: "Poppins,sans-serif" }}
                status="error"
                title="Submission Failed"
                subTitle={state}
                extra={[
                  <Button
                    style={{ fontFamily: "Poppins,sans-serif" }}
                    onClick={() => window.location.replace("home")}
                    type="primary"
                    key="console"
                  >
                    Go to Dashboard
                  </Button>,
                  <Button
                    onClick={() => window.location.replace("plan")}
                    key="buy"
                  >
                    Try Again
                  </Button>,
                ]}
              ></Result>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};
export default FailedPage;
