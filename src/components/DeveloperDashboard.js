import { useState, useEffect } from "react";
import {
  Layout,
  Avatar,
  Row,
  Col,
  Input,
  Menu,
  Button,
  Table,
  Descriptions,
  Divider,
  Modal,
  Alert,
  Skeleton,
} from "antd";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import "moment-timezone";
import "leaflet/dist/leaflet.css";
import "./styles/DeveloperDashboard.css";
import React from "react";
import Logo from "./logo.jpg";
import {
  GithubFilled,
  SkypeFilled,
  FacebookFilled,
  BuildOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAPI,
  getTransaction,
  getLimit,
  updatePass,
} from "../service/stateService";
import {
  logOut,
  removeToken,
  setTransaction,
  removeTransaction,
  removePlan,
} from "../redux/index";

const { Header, Footer, Content, Sider } = Layout;

const { SubMenu } = Menu;
const DeveloperDashboard = () => {
  const history = useHistory();
  /* ------------Select data population --------------*/
  const [menu, setMenu] = useState(1);
  const [limit, setLimit] = useState(0);
  const [plan, setPlan] = useState("Free");
  const [expiryDate, setExpiryDate] = useState("N/A");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login);
  const auth = useSelector((state) => state.auth);
  const [name, setName] = useState(userDetails.name);
  const [updatedMsg, setUpdatedMsg] = useState("success");
  const [updatedText, setUpdatedText] = useState("Updated Successfully !");
  const [msg, setMsg] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [IsProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const showUpdateProfileModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setName(userDetails.name);
    setIsProfileModalVisible(true);
    setMsg(false);
  };

  const handleUpdateProfileOk = async () => {
    let data = {
      email: userDetails.email,
      name: undefined,
      password: undefined,
    };
    var namePattern = new RegExp(/^[A-Z ]+$/i);
    if (name == "" || !namePattern.test(name)) {
      setError(true);
      return;
    }
    data.name = name;
    if (
      changePassword == true &&
      (currentPassword == "" ||
        newPassword == "" ||
        currentPassword !== newPassword)
    ) {
      if (currentPassword == "" || newPassword == "") {
        setPasswordErrMsg("Please fill all the details !");
      } else {
        setPasswordErrMsg("Passwords dont match !");
      }

      setPasswordErr(true);
      return;
    } else {
      data.password = currentPassword;
    }
    data.token = auth;
    let updated = await updatePass(data);
    if (updated.error == false) {
      setMsg(true);
      setUpdatedMsg("success");
      setUpdatedText("Updated Sucessfully!");
      setTimeout(() => setIsProfileModalVisible(false), 2000);
      return;
    }
    setMsg(true);
    setUpdatedText("Update failed !");
    setUpdatedMsg("error");
  };

  const handleUpdateProfileCancel = () => {
    setChangePassword(false);
    setIsProfileModalVisible(false);
  };
  useEffect(() => {
    async function getT() {
      let transaction = await getTransaction(userDetails.api);
      dispatch(setTransaction(transaction.data));
      let limit = await getLimit(userDetails.api);
      setLimit(limit.data[0].limit);
      setPlan(limit.data[0].plan);
      setExpiryDate(limit.data[0].expiryDate);
    }
    getT();
  }, []);
  const transaction = useSelector((state) => state.transaction);
  const columns = [
    {
      title: "Sr ",
      dataIndex: "key",
      responsive: ["xs", "md"],
    },
    {
      title: "Api ",
      dataIndex: "api",
      responsive: ["xs", "md"],
    },
    {
      title: "Execution Date",
      dataIndex: "date",
      sorter: {
        compare: (a, b) => a.date - b.date,
        multiple: 3,
      },
      responsive: ["xs", "md"],
    },
    {
      title: "Response Status",
      dataIndex: "status",
      sorter: {
        compare: (a, b) => a.status - b.status,
        multiple: 2,
      },
      responsive: ["md"],
    },
  ];

  let data = [];
  transaction.forEach((element, i) => {
    data.push({
      key: i + 1,
      api: element.request,
      date: moment
        .utc(element.executionDate)
        .tz("Asia/Calcutta")
        .format("dddd, MMMM D,YYYY,hh:mm a"),
      status: element.response,
    });
  });

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const downloadAPI = async () => {
    let data = await getAPI();
    if (
      data == undefined ||
      data.headers["content-type"] == "application/json; charset=utf-8"
    ) {
      return;
    }

    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "BaAL-API.zip");
    document.body.appendChild(link);
    link.click();
  };
  /* ------------View --------------*/
  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Header
        style={{
          backgroundColor: "#93C572",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {" "}
        <Row classapi="logo" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {" "}
          <Col md={8} xs={12}>
            <Avatar size={60} src={Logo} />{" "}
            <span
              className="headings"
              style={{
                fontFamily: " Akaya Telivigala, cursive ",
                fontSize: "50px",
              }}
            >
              <a href="/" style={{ color: "white" }}>
                BaAL
              </a>
            </span>{" "}
          </Col>
          <Col classapi="gutter-row" md={12} xs={0}>
            {" "}
            <span
              style={{
                fontFamily: " Akaya Telivigala, cursive ",
                fontSize: "40px",
              }}
            >
              Bank and ATM Location Finder{" "}
            </span>
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
          </Col>
          <Col>
            <span
              className="headings"
              style={{
                cursor: "pointer",
                fontSize: "32px",
                fontFamily: "Poppins,sans-serif",
              }}
              onClick={async () => {
                await dispatch(logOut());
                await dispatch(removeToken());
                await dispatch(removeTransaction());
                await dispatch(removePlan());
                history.push("/dev/login");
              }}
            >
              {" "}
              Logout <LogoutOutlined />
            </span>
          </Col>
        </Row>{" "}
      </Header>
      <Layout
        style={{
          padding: "2%",
          background:
            "linear-gradient(to top ,white ,  rgb(147, 197, 114) 100% )",
        }}
      >
        <Content
          style={{
            color: "#5a5a5a",
            backgroundColor: "white",
            borderRadius: "25px",
            boxShadow: " 0 7px 30px rgba(52, 31, 97, 0.342)",
          }}
        >
          {" "}
          <Row
            style={{
              color: "gray",
              fontFamily: "Amaranth",
            }}
          >
            <Col
              className="headings"
              md={{ offset: 10 }}
              xs={{ offset: 5 }}
              style={{ padding: "10px", fontSize: "30px" }}
            >
              Welcome {userDetails.name} !
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 4 }} style={{ paddingLeft: "1.7%" }}>
              <div
                className="men"
                style={{
                  height: "150px",
                  width: "350px",
                  backgroundColor: "#F3C363",
                  color: "white",
                  fontSize: "27px",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "25px",
                }}
              >
                <div
                  onClick={() => setMenu(1)}
                  style={{
                    paddingTop: "17%",
                    height: "200px",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif ",
                  }}
                >
                  {" "}
                  Home
                </div>
              </div>
            </Col>
            <Col style={{ paddingLeft: "1.7%" }}>
              <div
                className="men"
                style={{
                  height: "150px",
                  width: "350px",
                  backgroundColor: "#C2D9D2",
                  color: "white",
                  fontSize: "27px",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "25px",
                }}
              >
                <div
                  onClick={() => history.push("/api")}
                  style={{
                    paddingTop: "17%",
                    height: "200px",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif ",
                  }}
                >
                  Documentation
                </div>
              </div>
            </Col>
            <Col style={{ paddingLeft: "1.7%" }}>
              <div
                className="men"
                style={{
                  height: "150px",
                  width: "350px",
                  backgroundColor: "#765259",
                  color: "white",
                  fontSize: "27px",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "25px",
                }}
              >
                <div
                  onClick={() => setMenu(3)}
                  style={{
                    paddingTop: "17%",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif ",
                  }}
                >
                  Profile
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                padding: "5%",
              }}
            >
              {menu == 1 ? (
                <Row>
                  <Col>
                    <span
                      className="titles"
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "#5d8b46",
                      }}
                    >
                      {" "}
                      <BuildOutlined style={{ color: "gray" }} />
                      API Key :
                    </span>
                  </Col>
                  <Col md={{ span: 8, offset: 1 }} xs={24}>
                    <Input
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bolder",
                        fontSize: "18px",
                        backgroundColor: "white !important",
                      }}
                      readOnly
                      value={userDetails.api}
                    ></Input>{" "}
                    <br></br> <br></br> <br></br>
                  </Col>
                  <Col md={{ offset: 5 }}>
                    <span
                      className="titles"
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bolder",
                        fontSize: "25px",
                        color: "#5d8b46",
                      }}
                    >
                      {" "}
                      <BuildOutlined style={{ color: "gray" }} />
                      Postman API :
                    </span>{" "}
                    <Button
                      onClick={downloadAPI}
                      type="round"
                      style={{
                        height: "50%",
                        width: "100%",
                        fontSize: "100%",
                        backgroundColor: "rgba(211, 84, 94, 0.99)",
                        color: "white",
                        fontFamily: "Poppins, sans-serif ",
                        boxShadow: " 0 7px 10px rgba(52, 31, 97, 0.342) ",
                      }}
                    >
                      {" "}
                      <DownloadOutlined /> Download API Collection
                    </Button>{" "}
                    <br></br> <br></br> <br></br>
                  </Col>
                  <Col md={11} xs={0}>
                    <span
                      className="titles"
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bolder",
                        fontSize: "25px",
                        color: "#5d8b46",
                      }}
                    >
                      <BuildOutlined style={{ color: "gray" }} />
                      API usage :
                    </span>
                  </Col>
                  <Col md={{ span: 8, offset: 5 }} xs={24}>
                    <span
                      className="titles"
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bolder",
                        fontSize: "25px",
                        color: "#5d8b46",
                      }}
                    >
                      <BuildOutlined style={{ color: "gray" }} />
                      API hits available :{" "}
                      <span
                        className="titles"
                        title="Available api hits"
                        style={{
                          color: "#315B34",
                          padding: "2%",
                          fontSize: "100%",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        {" "}
                        {limit}
                      </span>
                      &nbsp;
                      {limit == 0 && (
                        <a style={{ fontSize: "14px" }} href="/dev/plan">
                          {" "}
                          Upgrade Subscription
                        </a>
                      )}
                    </span>{" "}
                    <br></br> <br></br> <br></br>
                  </Col>
                  <Col md={0} xs={24}>
                    <span
                      className="titles"
                      style={{
                        fontFamily: "Poppins, sans-serif ",
                        fontWeight: "bolder",
                        fontSize: "25px",
                        color: "#5d8b46",
                      }}
                    >
                      <BuildOutlined style={{ color: "gray" }} />
                      API usage :
                    </span>
                  </Col>
                  <br></br> <br></br> <br></br>
                  <Col md={24}>
                    <Table
                      respo
                      style={{
                        fontSize: "70%",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      columns={columns}
                      dataSource={data}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              ) : menu == 2 ? null : (
                <Row>
                  <Col md={5} xs={24}>
                    {" "}
                    <Button
                      onClick={() => history.push("plan")}
                      style={{
                        height: "70px",
                        width: "290px",
                        fontSize: "24px",
                        backgroundColor: "#6356B5",
                        color: "white",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                      type="round"
                    >
                      {" "}
                      Change API Plan
                    </Button>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <Button
                      style={{
                        height: "70px",
                        width: "290px",
                        fontSize: "24px",
                        backgroundColor: "#315B34 ",
                        color: "white",
                        fontFamily: "Poppins, sans-serif ",
                      }}
                      type="round"
                      onClick={showUpdateProfileModal}
                    >
                      {" "}
                      Update Profile
                    </Button>{" "}
                    <Modal
                      title="Update Profile"
                      visible={IsProfileModalVisible}
                      onOk={handleUpdateProfileOk}
                      onCancel={handleUpdateProfileCancel}
                      footer={[
                        <Button
                          className="mod"
                          key="back"
                          onClick={handleUpdateProfileCancel}
                        >
                          Cancel
                        </Button>,
                        <Button
                          className="mod"
                          key="submit"
                          type="primary"
                          onClick={handleUpdateProfileOk}
                        >
                          Update
                        </Button>,
                      ]}
                    >
                      {msg && (
                        <Alert
                          message={updatedText}
                          type={updatedMsg}
                          showIcon
                        />
                      )}
                      {error && (
                        <span style={{ color: "red", fontSize: "18px" }}>
                          {" "}
                          Invalid input !
                        </span>
                      )}
                      <br></br>
                      Name :
                      <Input
                        onFocus={() => setError(false)}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                        style={{
                          height: "40px",
                          color: "black",
                          fontSize: "20px",
                        }}
                        placeholder="Name"
                      />
                      Email:
                      <Input
                        value={userDetails.email}
                        readOnly
                        style={{
                          height: "40px",
                          fontSize: "20px",
                          color: "gray",
                        }}
                        placeholder="Email"
                      />
                      <Divider
                        onClick={() => setChangePassword(!changePassword)}
                        type="horizontal"
                      >
                        {" "}
                        <EditOutlined />
                        Change Password
                      </Divider>
                      {changePassword && (
                        <div>
                          {passwordErr && (
                            <span style={{ color: "red", fontSize: "18px" }}>
                              {passwordErrMsg}
                            </span>
                          )}
                          <br></br>
                          Enter new Password:
                          <Input.Password
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            onFocus={() => setPasswordErr(false)}
                            style={{
                              height: "40px",
                              color: "gray",
                            }}
                            placeholder="Password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                          Re-enter Password:
                          <Input.Password
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setPasswordErr(false)}
                            style={{
                              height: "40px",
                              color: "gray",
                            }}
                            placeholder="Password"
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        </div>
                      )}
                    </Modal>
                  </Col>
                  <Divider></Divider>
                  <Col span={24}>
                    {" "}
                    <Descriptions
                      title="Account Details"
                      bordered
                      column={1}
                      style={{
                        boxShadow: "  8px 8px 8px -8px gray",
                        fontSize: "70%",
                      }}
                    >
                      <Descriptions.Item
                        label="Name"
                        style={{
                          backgroundColor: "#ffffff78",
                          fontSize: "150%",
                          fontFamily: "Poppins, sans-serif ",
                        }}
                      >
                        {userDetails.name}
                      </Descriptions.Item>
                      <Descriptions.Item
                        style={{
                          backgroundColor: "#ffffff78",
                          fontSize: "150%",
                          fontFamily: "Poppins, sans-serif ",
                        }}
                        label="Email"
                      >
                        {userDetails.email}
                      </Descriptions.Item>
                      <Descriptions.Item
                        style={{
                          backgroundColor: "#ffffff78",
                          fontSize: "150%",
                          fontFamily: "Poppins, sans-serif ",
                        }}
                        label="Password"
                      >
                        ***** &nbsp;&nbsp;&nbsp;
                        <Button
                          className="update"
                          type="round"
                          size="large"
                          style={{
                            backgroundColor: "#1e8aff",
                            color: "white",
                          }}
                          onClick={() => {
                            setChangePassword(true);
                            showUpdateProfileModal();
                          }}
                        >
                          {" "}
                          Update password{" "}
                        </Button>
                      </Descriptions.Item>
                      <Descriptions.Item
                        style={{
                          backgroundColor: "#ffffff78",
                          fontSize: "150%",
                          fontFamily: "Poppins, sans-serif ",
                        }}
                        label="Api Subscription type :"
                      >
                        {plan}
                      </Descriptions.Item>
                      <Descriptions.Item
                        style={{
                          backgroundColor: "#ffffff78",
                          fontSize: "150%",
                          fontFamily: "Poppins, sans-serif ",
                        }}
                        label="Subscription Expiry Date :"
                      >
                        {expiryDate == "null"
                          ? "N/A"
                          : moment
                              .utc(new Date(expiryDate).toISOString())

                              .format("dddd, MMMM D,YYYY")}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
      )
      <Footer
        style={{ backgroundColor: "#93C572", height: "150px", color: "white" }}
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
  );
};

export default DeveloperDashboard;
