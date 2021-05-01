import { useState, useEffect, useRef } from "react";
import {
  Layout,
  Avatar,
  Row,
  Col,
  Input,
  Card,
  Skeleton,
  Empty,
  List,
  Button,
  Divider,
  Space,
  Carousel,
} from "antd";
import { useLocation, useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Bank from "./bank.svg";
import ATM from "./atm.png";
import React from "react";
import Logo from "./logo.jpg";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Select } from "antd";
import {
  SearchOutlined,
  GithubFilled,
  SkypeFilled,
  MenuOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import "../App.css";
import { MODE } from "../data/Mode";
import {
  getStates,
  getCities,
  getBanks,
  getResults,
  getKeywordResults,
} from "../service/stateService";
const { Option } = Select;
const { Header, Footer, Content, Sider } = Layout;

const Main = () => {
  const history = useHistory();
  /* ------------Select data population --------------*/
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [location, setLocation] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [menuHeight, setmenuHeight] = useState(19);
  const [showMenu, setshowMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [state, setState] = useState({
    lat: 20.795305507037043,
    lng: 78.86642256713631,
    zoom: 5,
  });
  const contentStyle = {
    height: "560px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  /* ------------Flag to check if value is selected --------------*/
  const [isSearched, setIsSearched] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedType, setSelectedType] = useState(1);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  /* ------------Use effect to populate state and bank select data --------------*/
  useEffect(() => {
    async function stateData() {
      const states = await getStates();
      setStateData(states.data.data);
    }
    async function bankData() {
      const banks = await getBanks();
      setBankData(banks.data.data);
    }
    stateData();
    bankData();
  }, []);

  /* ------------Result of Search --------------*/
  const [result, setResult] = useState(null);
  /* ------------ Function to fetch city data when a state is selected --------------*/
  const getCity = (e) => {
    setIsSearched(true);
    setResult(<Skeleton active />);

    let isStateData = stateData.filter((a) => a.state_id == e);
    let is_available = isStateData[0].is_data_available;
    setSelectedState(e);
    setTimeout(async () => {
      if (is_available) {
        let cities = await getCities(e);
        await setCityData(cities.data.data);
      }
      searchResult(isStateData[0], "state");
    }, 2000);
  };

  /* ------------ Function to fetch data from input text --------------*/
  const getSearchKeyword = async (e) => {
    setShowRes(true);
    let keywords = e.split(",");
    setResult(<Skeleton active />);
    let is_state = [];
    let is_city = [];
    let is_bank = [];
    let keyword = null;

    for (var i = 0; i < keywords.length; i++) {
      var state = stateData.filter(
        (e) => e.state_name.toLowerCase() == keywords[i].trim().toLowerCase()
      );
      if (state.length > 0) is_state.push(state[0]);

      var bank = bankData.filter(
        (e) => e.bank_name.toLowerCase() == keywords[i].trim().toLowerCase()
      );
      if (bank.length > 0) is_bank.push(bank[0]);

      var city = cityData.filter(
        (e) => e.city_name.toLowerCase() == keywords[i].trim().toLowerCase()
      );
      if (city.length > 0) is_city.push(city[0]);

      if (city.length == 0 && state.length == 0 && bank.length == 0) {
        keyword = keywords[i].trim();
      }
    }

    if (is_state.length == 0 && is_city.length == 0 && is_bank.length == 0) {
      keyword = keywords.slice(0, 1);
    }

    if (keywords.length == 1 && is_bank.length > 0) {
      setDisabled(false);
    }
    let data = await getKeywordResults(is_state, is_city, is_bank, keyword);

    setSelectedKeyword(data);
    searchResult(null, null, data);
  };

  /* ------------ Function tofetch data from select and to display --------------*/
  const searchResult = async (data, info, search = "") => {
    setIsSearched(true);
    setShowRes(true);
    let result = null;
    let type = selectedType;
    let city = selectedCity;
    let state = selectedState;
    let bank = selectedBank;
    if (info == "type") {
      type = data.type;
    }
    if (search == "") {
      if (info == "state") {
        state = data.state_id;
      }
      if (info == "city") {
        city = data.city_id;
      }
      if (info == "bank") {
        bank = data.bank_id;
      }

      if (state == null && city == null && bank == null && type == null) {
        return;
      }
    }

    if (
      search !== "" ||
      (selectedKeyword.data !== undefined && selectedKeyword.data.length > 0)
    ) {
      if (selectedKeyword.data !== undefined && search == "")
        search = { ...selectedKeyword };

      if (bank !== null) {
        search.data = search.data.filter((a) => a.bank_id == bank);
      }
      if (state !== null) {
        search.data = search.data.filter((a) => a.state_id == state);

        setSelectedKeyword(search);
      }
      if (city !== null) {
        search.data = search.data.filter((a) => a.city_id == city);
      }
    } else if (search == "") {
      search = await getResults(state, city, bank, type);
    }

    if (type == 2) {
      search.data = search.data.filter((e) => e.is_bank == true);
    }
    if (type == 3) {
      search.data = search.data.filter((e) => e.is_bank == false);
    }
    if (
      search.status == false ||
      search.data == undefined ||
      search.data.length == 0
    ) {
      if (info == "type" || data == null) {
        data = {
          state_name: " this search ",
        };
      }
      setLocation([]);
      result = (
        <Row
          style={{
            color: "#7ABAC2",
            fontWeight: "bold",
            fontSize: "23px",
            fontFamily: "Poppins , sans-serif",

            paddingLeft: "38%",
          }}
        >
          <Col
            span={24}
            style={{
              color: "#7ABAC2",
              fontWeight: "bold",
            }}
          >
            No Data found for this search !
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Empty description={false} />
          </Col>
        </Row>
      );
    } else {
      let loc = [];
      search.data.map((e) => {
        loc.push({
          key: e.branch_id,
          bank: e.bank_id,
          coordinates: e.branch_coords.split`,`.map((x) => +x),
          address: e.branch_address,
          phone: e.branch_phone,
          timing: e.branch_timing,
          is_bank: e.is_bank,
        });
      });
      setLocation(loc);
      setState({
        lat: loc[0].coordinates[0],
        lng: loc[0].coordinates[1],
        zoom: 8,
      });

      result = (
        <List
          style={{
            fontSize: "19px",
            width: "100%",
            paddingTop: "1%",
            paddingLeft: "4%",
            paddingRight: "4%",
            fontFamily: "Poppins , sans-serif",
          }}
          itemLayout="vertical"
          size="small"
          pagination={{
            pageSize: 1,
          }}
          dataSource={search.data}
          renderItem={(item) => (
            <List.Item
              style={{
                backgroundColor: "white",
                fontFamily: "Poppins , sans-serif",
                boxShadow: "0 7px 30px rgba(52, 31, 97, 0.1)",
              }}
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={
                    process.env.PUBLIC_URL + "/bank/" + item.bank_id + ".png"
                  }
                />
              }
            >
              <List.Item.Meta
                title={
                  <a
                    style={{
                      width: "30px",
                      fontWeight: "bolder",
                      fontFamily: "Poppins , sans-serif",
                      fontSize: "20px",
                      color: "rgb(0 0 0 / 60%)",
                    }}
                  >
                    <u
                      onClick={() => {
                        let coords = item.branch_coords.split`,`.map((x) => +x);
                        window.scrollTo(0, 0);
                        return setState({
                          lat: coords[0],
                          lng: coords[1],
                          zoom: 14,
                        });
                      }}
                    >
                      {bankData[item.bank_id - 1].bank_name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="red"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                    </u>
                  </a>
                }
                description={
                  <span style={{ fontSize: "19px" }}>{item.city_name}</span>
                }
              />
              <p>
                <span
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "Poppins , sans-serif",
                    fontSize: "20px",
                  }}
                >
                  Branch Address :
                </span>{" "}
                <span style={{ width: "20%" }}> {item.branch_address}</span>
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "Poppins,sans-serif",
                    fontSize: "20px",
                  }}
                >
                  Branch Timings :{" "}
                </span>
                {item.branch_timing}
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bolder",
                    fontFamily: "Poppins,sans-serif",
                    fontSize: "20px",
                  }}
                >
                  Branch Phone :{" "}
                </span>
                {item.branch_phone}
              </p>
            </List.Item>
          )}
        />
      );
    }
    setResult(result);
  };

  const bank = new Icon({
    iconUrl: Bank,
    iconSize: [40, 40],
  });
  const atm = new Icon({
    iconUrl: ATM,
    iconSize: [40, 40],
  });

  function SetViewOnClick({ state }) {
    const map = useMap();
    map.setView(state, state.zoom);

    return null;
  }
  function Markers({ location }) {
    const map = useMap();

    return location.map((marker, index) => {
      return (
        <Marker
          eventHandlers={{
            click: () => {
              map.setView(marker.coordinates, 14);
            },
          }}
          key={index}
          position={marker.coordinates}
          icon={marker.is_bank ? bank : atm}
        >
          <Popup>
            <h1 style={{ textAlign: "center" }}>
              <b>{bankData[marker.bank - 1].bank_name}</b>
            </h1>
            <h3>
              <b> Branch Address :</b>
              {marker.address}
            </h3>
            <h3>
              {" "}
              <b>Branch Phone :</b>
              {marker.phone}
            </h3>
            <h3>
              <b>Branch Timing :</b>
              {marker.timing}
            </h3>
          </Popup>
        </Marker>
      );
    });
  }
  /* ------------View --------------*/
  return (
    <Layout style={{ height: "100vh" }}>
      <Row>
        {showMenu && (
          <Col
            className="map3"
            md={4}
            xs={24}
            style={{
              backgroundColor: "white",
              height: "100vh",
            }}
          >
            <Row>
              <Col
                xs={0}
                md={24}
                style={{ backgroundColor: "rgb(147, 197, 114)" }}
              >
                <Avatar
                  size={125}
                  style={{ border: "solid gray 1px" }}
                  src={Logo}
                ></Avatar>
              </Col>
              <Col
                xs={0}
                md={24}
                style={{ backgroundColor: "rgb(147, 197, 114)" }}
              >
                <span
                  style={{
                    padding: "13%",
                    fontSize: "3.25rem",
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Akaya Telivigala, cursive",
                  }}
                >
                  BaAL
                </span>
              </Col>
              <Col
                xs={0}
                md={24}
                style={{ backgroundColor: "rgb(147, 197, 114)" }}
              >
                <span
                  style={{
                    fontSize: "25px",
                    color: "rgb(160, 68, 76)",
                    fontFamily: "Akaya Telivigala, cursive",
                  }}
                >
                  {" "}
                  Bank and ATM location Finder
                </span>
              </Col>
              <Col
                onClick={() => history.push("/dev/login")}
                className="selected"
                style={{ color: "white", cursor: "pointer" }}
                span={24}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#363E4E",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  {" "}
                  Sign In
                </span>
              </Col>
              <div className="divider"></div>
              <Col
                onClick={() => history.push("/api")}
                className="selected"
                style={{ color: "white", cursor: "pointer" }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#363E4E",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  {" "}
                  API Documentation
                </span>
              </Col>
              <div className="divider"></div>
            </Row>
          </Col>
        )}
        <Col
          className="map"
          xs={{ span: 24 }}
          md={menuHeight}
          style={{ height: "100vh", backgroundColor: "whitesmoke" }}
        >
          {" "}
          <div
            style={{
              backgroundColor: "#93C572",
              boxShadow: "0 7px 30px rgba(52, 31, 97, 0.2)",
            }}
          >
            <MenuOutlined
              onClick={() => {
                setshowMenu(!showMenu);
                !showMenu ? setmenuHeight(15) : setmenuHeight(19);
              }}
              style={{
                fontSize: "2rem",
                color: "white",
                fontWeight: "bold",
              }}
            />
            <span
              style={{
                paddingLeft: "38%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "32px",
                color: "white",
                textShadow: "1px 1px black",
                fontFamily: "Akaya Telivigala, cursive",
              }}
            >
              {" "}
              Bank and ATM location Finder
            </span>
          </div>
          <MapContainer
            className="map1"
            center={
              location.length > 0
                ? location[0].coordinates
                : [state.lat, state.lng]
            }
            zoom={state.zoom}
            style={{ height: "54vh", width: "100%" }}
          >
            <SetViewOnClick state={state}></SetViewOnClick>
            {location.length > 0 && <Markers location={location}></Markers>}
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          {showRes ? (
            result
          ) : (
            <Carousel
              autoplay
              autoplaySpeed={2000}
              className="map2"
              style={{
                height: "37vh",
                boxShadow: "0 7px 30px rgba(52, 31, 97, 0.1)",
              }}
            >
              <div>
                <div
                  className="map2"
                  style={{
                    color: "white",
                    textAlign: "center",
                    opacity: "0.8",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <h1
                    className="headings"
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: "bold",
                      height: "63px",
                      backgroundColor: "#8872C5",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    <Avatar
                      size={78}
                      src={`${process.env.PUBLIC_URL}/bank.jpg`}
                    ></Avatar>{" "}
                    100+ Bank info available
                  </h1>
                  <Row>
                    <Col md={8}>
                      <img
                        style={{ width: "70%" }}
                        src={process.env.PUBLIC_URL + "/leading.jpeg"}
                      ></img>
                    </Col>
                    <Col md={16}>
                      <div
                        className="titles"
                        style={{
                          color: "black",
                          textAlign: "center",
                          fontSize: "30px",
                          fontFamily: "Poppins,sans-serif",
                          fontWeight: "bolder",
                          textShadow: "2px 2px white",
                          height: "29vh",
                          padding: "4%",
                        }}
                      >
                        Our database consists information of 100+ Banks and ATMS
                        , and counting..
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div>
                <Row
                  className="map2"
                  style={{
                    height: "35vh",
                    boxShadow: "inset 0px 0 10px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Col
                    className="headings"
                    xs={{ span: "24" }}
                    style={{
                      textAlign: "center",
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontFamily: "Poppins,sans-serif",
                      color: "white",
                      backgroundColor: "#72C5A4",
                      textShadow: "2px 2px black",
                    }}
                  >
                    {" "}
                    Top leading Bank Data Available
                  </Col>
                  {bankData.map((e) => (
                    <Col
                      key={e.bank_id}
                      md={{ span: "5", offset: 3 }}
                      xs={{ span: "12" }}
                    >
                      <img
                        style={{ width: "160px", height: "70px" }}
                        alt="logo"
                        key={e.bank_id}
                        src={
                          process.env.PUBLIC_URL + "/bank/" + e.bank_id + ".png"
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              <div style={{ height: "35vh" }}>
                <div
                  className="map2"
                  style={{
                    color: "white",
                    textAlign: "center",
                    opacity: "0.8",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <h1
                    className="headings"
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: "bold",
                      height: "63px",
                      backgroundColor: "#C57A72",
                      fontFamily: "Poppins,sans-serif",
                      zIndex: "9999",
                    }}
                  >
                    {" "}
                    <Avatar
                      size={78}
                      src={`${process.env.PUBLIC_URL}/map.jpg`}
                    ></Avatar>{" "}
                    Accurate locations
                  </h1>
                  <Row>
                    <Col md={8}>
                      <img
                        style={{ width: "70%" }}
                        src={process.env.PUBLIC_URL + "/accurate.jpeg"}
                      ></img>
                    </Col>
                    <Col md={16}>
                      <div
                        className="titles"
                        style={{
                          color: "#171515",
                          textAlign: "center",
                          fontSize: "25px",
                          fontFamily: "Poppins,sans-serif",
                          fontWeight: "bolder",
                          textShadow: "4px 4px white",
                          height: "28vh",
                          zIndex: "9999",
                          padding: "4%",
                        }}
                      >
                        Periodic updates are made in our databases to provide
                        accurate information about Banks and ATMS and accurate
                        geocoordinates , to give a hassle free service to the
                        user ! <br></br>{" "}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ height: "35vh" }}>
                <div
                  className="map2"
                  style={{
                    color: "white",
                    textAlign: "center",
                    opacity: "0.8",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <h1
                    className="headings"
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: "26px",
                      fontWeight: "bold",
                      height: "63px",
                      backgroundColor: "rgb(121 110 111 / 99%)",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    {" "}
                    Free API kit for development
                  </h1>
                  <Row>
                    <Col md={8}>
                      <img
                        style={{ width: "70%" }}
                        src={process.env.PUBLIC_URL + "/portal.jpeg"}
                      ></img>
                    </Col>
                    <Col md={16}>
                      <div
                        className="titles"
                        style={{
                          color: "black",
                          textAlign: "center",
                          fontSize: "30px",
                          fontFamily: "Poppins,sans-serif",
                          fontWeight: "bolder",
                          textShadow: "2px 2px white",
                          height: "28vh",
                          padding: "4%",
                        }}
                      >
                        Developers can get access to free API kit and guide
                        provided by signing up on our Developer's portal
                        <br></br>{" "}
                        <a href="/api">
                          <Button
                            className="headings"
                            type="primary"
                            shape="round"
                            style={{
                              height: "70px",
                              fontSize: "25px",
                              width: "360px",
                              backgroundColor: "#6f42c1",
                            }}
                          >
                            {" "}
                            Visit Developer Portal{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
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
                          </Button>
                          <br></br>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Carousel>
          )}
        </Col>
        <Col
          md={5}
          className="search"
          xs={24}
          style={{
            height: "100vh",
            backgroundColor: "white",
            width: "100%",
            boxShadow: "0 7px 30px rgba(52, 31, 97, 0.6)",
          }}
        >
          <Row
            style={{
              color: "white",
              backgroundColor: "rgb(147, 197, 114)",
              fontFamily: "Poppins , sans-serif",
            }}
          >
            {" "}
            <span
              style={{
                paddingLeft: "15%",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#363E4E",
                fontFamily: "Akaya Telivigala, cursive",
              }}
            >
              Bank and ATM location Finder <br></br> <br></br>
            </span>
            <Col xs={{ offset: 5 }} style={{ fontSize: "24px" }}>
              Find Nearest Banks
            </Col>
          </Row>
          <Row
            style={{
              color: "white",
              fontSize: "21px",
              paddingTop: "19px",
              paddingBottom: "19px",
              paddingLeft: "10px",

              fontFamily: "Comic Sans MS",
            }}
          >
            <Col
              className="headings"
              md={24}
              xs={24}
              style={{
                color: "#A0444C",
                fontWeight: "bold",
                fontFamily: "Poppins , sans-serif",
                fontSize: "26px",
              }}
            >
              SEARCH <div className="divider"></div>
            </Col>

            <Col xs={24} md={24}>
              <Input
                style={{
                  fontFamily: "Poppins , sans-serif",
                  backgroundColor: "white",
                }}
                onKeyPress={(e) =>
                  e.key === "Enter"
                    ? (setDisabled(true),
                      setIsSearched(true),
                      getSearchKeyword(searchKeywords))
                    : null
                }
                onChange={(event) => {
                  setSelectedState(null);
                  setSelectedBank(null);
                  setSearchKeywords(event.target.value);
                }}
                value={searchKeywords}
                placeholder="Search by Bank Name , Branch , City , State"
                suffix={
                  <SearchOutlined
                    onClick={() => {
                      setDisabled(true);
                      setIsSearched(true);
                      getSearchKeyword(searchKeywords);
                    }}
                    style={{ fontSize: "26px" }}
                  ></SearchOutlined>
                }
              ></Input>
            </Col>
            <br></br>
            <br></br>
            <br></br>
          </Row>
          <Row
            style={{
              color: "white",
              fontSize: "21px",
              paddingTop: "19px",
              paddingBottom: "19px",
              paddingLeft: "10px",
              paddingRight: "10px",
              fontFamily: "Comic Sans MS",
            }}
          >
            <Col
              className="headings"
              md={24}
              xs={24}
              style={{
                color: "#A0444C",
                fontWeight: "bold",
                fontFamily: "Poppins , sans-serif",
                fontSize: "26px",
              }}
            >
              FILTERS <div className="divider"></div>
            </Col>
            <Col
              className="headings"
              span={12}
              style={{ color: "#c48689", fontFamily: "Poppins , sans-serif" }}
            >
              {" "}
              Bank / ATM :
            </Col>
            <Col md={12} xs={9}>
              <Select
                style={{
                  fontSize: "19px",
                  color: "black",
                  fontFamily: "Poppins , sans-serif",
                  width: "100%",
                }}
                value={selectedType}
                onSelect={(e) => {
                  setResult(<Skeleton active />);
                  setSelectedType(e);
                  searchResult({ type: e }, "type");
                }}
                placeholder={
                  <span
                    style={{
                      fontSize: "19px",
                      color: "black",
                      fontFamily: "Poppins , sans-serif",
                    }}
                  >
                    Select
                  </span>
                }
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "19px", color: "black" }}
                  />
                }
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {MODE.map((type) => (
                  <Option
                    style={{
                      fontFamily: "Poppins , sans-serif",
                    }}
                    className="Option"
                    key={type.key}
                    value={type.key}
                  >
                    {type.value}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col
              span={12}
              style={{ color: "#c48689", fontFamily: "Poppins , sans-serif" }}
            >
              {" "}
              State:
            </Col>
            <Col md={12} xs={9}>
              <Select
                style={{
                  fontSize: "21px",
                  fontFamily: "Poppins , sans-serif",
                  width: "100%",
                }}
                disabled={disabled}
                value={selectedState}
                onSelect={(e) => {
                  setShowRes(true);
                  setSelectedKeyword("");
                  getCity(e);
                }}
                placeholder={
                  <span style={{ fontSize: "19px", color: "black" }}>
                    State
                  </span>
                }
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "19px", color: "black" }}
                  />
                }
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {stateData.map((state) => (
                  <Option className="Option" key={state.state_id}>
                    {state.state_name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col
              span={12}
              style={{ color: "#c48689", fontFamily: "Poppins , sans-serif" }}
            >
              {" "}
              City:
            </Col>
            <Col md={12} xs={9}>
              <Select
                disabled={disabled}
                value={selectedCity}
                onSelect={(e) => {
                  setResult(<Skeleton active />);
                  setSelectedCity(e);
                  searchResult({ city_id: e, state_name: "location" }, "city");
                }}
                placeholder={
                  <span style={{ fontSize: "19px", color: "black" }}>City</span>
                }
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "19px", color: "black" }}
                  />
                }
                style={{
                  fontSize: "21px",
                  fontFamily: "Poppins , sans-serif",
                  width: "100%",
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {cityData.map((city) => (
                  <Option className="Option" key={city.city_id}>
                    {city.city_name}
                  </Option>
                ))}
              </Select>
            </Col>{" "}
            <Col
              span={12}
              style={{ color: "#c48689", fontFamily: "Poppins , sans-serif" }}
            >
              {" "}
              Bank:
            </Col>
            <Col md={12} xs={9}>
              <Select
                value={selectedBank}
                onSelect={(e) => {
                  setResult(<Skeleton active />);
                  setSelectedBank(e);
                  searchResult(
                    { bank_id: e, state_name: bankData[e - 1].bank_name },
                    "bank"
                  );
                }}
                placeholder={
                  <span style={{ fontSize: "19px", color: "black" }}>
                    Bank Name
                  </span>
                }
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "19px", color: "black" }}
                  />
                }
                style={{
                  fontSize: "21px",
                  fontFamily: "Poppins , sans-serif",
                  width: "100%",
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {bankData.map((bank) => (
                  <Option className="Option" key={bank.bank_id}>
                    {bank.bank_name}
                  </Option>
                ))}
              </Select>
            </Col>
            <br></br> <br></br>
            <Col md={{ span: 10 }} style={{ paddingLeft: "32%" }}>
              <Button
                className="update"
                style={{
                  color: "white",
                  fontSize: "1.25rem",
                  height: "50px",
                  backgroundColor: "#A0444C",
                }}
                onClick={() => {
                  setShowRes(false);
                  setDisabled(false);
                  setSelectedState(null);
                  setSelectedCity(null);
                  setSelectedBank(null);
                  setSelectedType(null);
                  setResult(null);
                  setIsSearched(false);
                  setState({
                    lat: 20.795305507037043,
                    lng: 78.86642256713631,
                    zoom: 5,
                  });
                  setLocation([]);
                  setSelectedKeyword("");
                  setSearchKeywords("");
                  setCityData([]);
                }}
              >
                <ClearOutlined> </ClearOutlined> Reset Filter
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default Main;
