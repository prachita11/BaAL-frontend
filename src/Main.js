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
} from "antd";
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
  FacebookFilled,
  ClearOutlined,
} from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import "./App.css";
import { MODE } from "./data/Mode";
import {
  getStates,
  getCities,
  getBanks,
  getResults,
  getKeywordResults,
} from "./service/stateService";
const { Option } = Select;
const { Header, Footer, Content } = Layout;

const Main = () => {
  /* ------------Select data population --------------*/
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [bankData, setBankData] = useState([]);
  const [location, setLocation] = useState([]);
  const [height, setHeight] = useState("400vh");
  const [disabled, setDisabled] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [state, setState] = useState({
    lat: 20.795305507037043,
    lng: 78.86642256713631,
    zoom: 5,
  });
  let map;
  const inputEl = useRef(null);
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
            padding: "40px",
            border: "solid gray",
            fontFamily: "Comic Sans MS",
          }}
        >
          <Col
            md={{ offset: 9 }}
            xs={{ offset: 5 }}
            sm={{ offset: 7 }}
            style={{ color: "#7ABAC2", fontWeight: "bold" }}
          >
            No Data found for this search !
          </Col>
          <Col md={{ offset: 10 }} xs={{ offset: 5 }} sm={{ offset: 7 }}>
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
      setHeight("400vh");
      result = (
        <Row
          style={{
            padding: "40px",
            border: "solid gray",
            fontFamily: "Comic Sans MS",
          }}
        >
          <Col
            md={{ offset: 9 }}
            xs={{ offset: 5 }}
            sm={{ offset: 7 }}
            style={{ color: "#7ABAC2", fontWeight: "bold", fontSize: "24px" }}
          >
            Nearest Banks/ATM in this location :
          </Col>
          <List
            style={{
              width: "100%",
              fontSize: "19px",
            }}
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 3,
            }}
            dataSource={search.data}
            renderItem={(item) => (
              <List.Item
                style={{ backgroundColor: "#e6e6e6", fontFamily: "Open Sans" }}
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
                        fontWeight: "bolder",
                        fontFamily: "Comic Sans MS",
                        fontSize: "20px",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      <u
                        onClick={() => {
                          let coords = item.branch_coords.split`,`.map(
                            (x) => +x
                          );
                          window.scrollTo(0, 0);
                          return setState({
                            lat: coords[0],
                            lng: coords[1],
                            zoom: 14,
                          });
                          inputEl.current.click();
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
                      fontFamily: "Comic Sans MS",
                      fontSize: "20px",
                    }}
                  >
                    Branch Address :
                  </span>{" "}
                  {item.branch_address}
                </p>
                <p>
                  <span
                    style={{
                      fontWeight: "bolder",
                      fontFamily: "Comic Sans MS",
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
                      fontFamily: "Comic Sans MS",
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
        </Row>
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
          ref={inputEl}
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
    <Layout>
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
          <Col className="gutter-row" md={8} xs={24}>
            <Avatar size={60} src={Logo} /> BaAL
          </Col>
          <Col className="gutter-row" md={13}>
            {" "}
            Bank and ATM Location Finder
          </Col>
        </Row>{" "}
      </Header>
      <Layout style={{ height: "400vh" }}>
        <Content
          style={{
            color: "#5a5a5a",
            backgroundColor: "#fcfbe9",
          }}
        >
          <MapContainer
            center={
              location.length > 0
                ? location[0].coordinates
                : [state.lat, state.lng]
            }
            zoom={state.zoom}
            style={{ width: "100%", height: "10%" }}
          >
            <SetViewOnClick state={state}></SetViewOnClick>
            {location.length > 0 && <Markers location={location}></Markers>}
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <Row
            style={{
              color: "white",
              backgroundColor: "#f0c064",
              fontFamily: "Amaranth",
            }}
          >
            <Col
              md={{ offset: 10 }}
              xs={{ offset: 5 }}
              style={{ padding: "10px", fontSize: "24px" }}
            >
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
              paddingRight: "10px",
              fontFamily: "Comic Sans MS",
            }}
          >
            <Col md={3} xs={7} style={{ color: "#c48689" }}>
              Search
            </Col>
            <Col md={3} xs={9}>
              <Select
                style={{ fontSize: "21px !important" }}
                value={selectedType}
                onSelect={(e) => {
                  setResult(<Skeleton active />);
                  setSelectedType(e);
                  searchResult({ type: e }, "type");
                }}
                placeholder={
                  <span style={{ fontSize: "21px", color: "black" }}>
                    Select
                  </span>
                }
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "19px", color: "black" }}
                  />
                }
                style={{ width: "100%", color: "black" }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {MODE.map((type) => (
                  <Option
                    style={{ fontSize: "21px" }}
                    className="Option"
                    key={type.key}
                    value={type.key}
                  >
                    {type.value}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={22} md={15} offset={1}>
              <Input
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
            <Col md={3} xs={7} style={{ color: "#c48689" }}>
              Filters
            </Col>
            <Col md={3} xs={9}>
              <Select
                style={{ backgroundColor: "gray" }}
                disabled={disabled}
                value={selectedState}
                onSelect={(e) => {
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
                style={{ width: "100%", color: "black" }}
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
            <Col md={{ span: 3, offset: 1 }} xs={{ offset: 7, span: 9 }}>
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
                style={{ width: "100%", color: "black" }}
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
            <Col md={{ span: 3, offset: 1 }} xs={{ offset: 7, span: 9 }}>
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
                style={{ width: "100%", color: "black" }}
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
            <Col md={{ span: 3, offset: 1 }} xs={{ offset: 7, span: 9 }}>
              <Button
                shape="round"
                style={{ backgroundColor: "#93C572", color: "white" }}
                onClick={() => {
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
                  setHeight("400vh");
                }}
              >
                <ClearOutlined> </ClearOutlined> Reset Filter
              </Button>
            </Col>
          </Row>
          <Space direction="vertical" size={72}>
            {result}

            <Row
              style={{
                paddingTop: "100px",
                backgroundColor: "#7ABAC2",
                paddingBottom: "3%",
                fontFamily: "Comic Sans MS",
              }}
            >
              <Col
                md={{ offset: 9 }}
                xs={{ offset: 1 }}
                sm={{ offset: 5 }}
                style={{
                  color: "black",
                  fontSize: "34px",
                  fontWeight: "bold",
                }}
              >
                What makes BaAL <b>different</b>?
              </Col>
            </Row>

            <Row
              gutter={[1, 32]}
              style={{
                paddingBottom: "3%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/bank.jpg)`,
                border: " solid 2px #86AD63",
              }}
              justify="center"
            >
              <Col
                md={{ span: 24 }}
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "26px",
                  fontWeight: "bold",
                  backgroundColor: "rgb(121 110 111 / 99%)",
                  fontFamily: "Comic Sans MS",
                }}
              >
                {" "}
                100+ Bank info available
              </Col>
              <Col
                md={{ span: 24 }}
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "30px",
                  fontFamily: "Comic Sans MS",
                  height: "30vh",
                }}
              >
                {" "}
                <span style={{ background: "white" }}>
                  {" "}
                  Our database consists information of 100+ Banks and ATMS , and
                  counting..{" "}
                </span>
              </Col>
            </Row>
            <Row
              gutter={[1, 32]}
              style={{
                paddingTop: "3%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/map.jpg)`,
                paddingBottom: "3%",
                border: " solid 2px #86AD63",
              }}
              justify="center"
            >
              <Col
                md={{ span: 24 }}
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "26px",
                  backgroundColor: "rgb(121 110 111 / 99%)",
                  fontWeight: "bold",
                  fontFamily: "Comic Sans MS",
                }}
              >
                {" "}
                Accurate locations
              </Col>

              <Col
                md={{ span: 15 }}
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Comic Sans MS",
                  height: "30vh",
                }}
              >
                {" "}
                <span style={{ background: "white" }}>
                  Periodic updates are made in our databases to provide accurate
                  information about Banks and ATMS and accurate geocoordinates ,
                  to give a hassle free service to the user !{" "}
                </span>
              </Col>
            </Row>

            <Row
              gutter={[1, 32]}
              style={{
                paddingTop: "3%",
                backgroundImage: `url(${process.env.PUBLIC_URL}/API.jpg)`,
                paddingBottom: "3%",
                border: " solid 2px #86AD63",
              }}
              justify="center"
            >
              <Col
                md={{ span: 24 }}
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "29px",
                  backgroundColor: "rgb(121 110 111 / 99%)",
                  fontWeight: "bold",
                  fontFamily: "Comic Sans MS",
                }}
              >
                {" "}
                Free API kits for development
              </Col>
              <Col
                md={{ span: 24 }}
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: "32px",
                  fontFamily: "Comic Sans MS",
                  height: "30vh",
                }}
              >
                {" "}
                <span style={{ background: "white" }}>
                  Developers can get access to free API kit and guide provided
                  by signing up on our Developer's portal{" "}
                </span>
              </Col>
              <Col>
                <a href="/api">
                  <Button
                    type="primary"
                    shape="round"
                    style={{
                      height: "90px",
                      fontSize: "30px",
                      width: "360px",
                      backgroundColor: "#6f42c1",
                    }}
                  >
                    {" "}
                    Visit Developer Portal{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
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
                </a>
              </Col>
            </Row>
          </Space>
          <Row
            gutter={[1, 32]}
            style={{
              paddingTop: "3%",
            }}
          >
            <Col
              xs={{ span: "24" }}
              style={{
                textAlign: "center",
                paddingBottom: "7%",
                fontSize: "35px",
                fontWeight: "bold",
                fontFamily: "Comic Sans MS",
                color: "rgb(211 84 94 / 99%)",
              }}
            >
              {" "}
              Top leading Bank Data Available
            </Col>
            {bankData.map((e) => (
              <Col
                key={e.bank_id}
                md={{ span: "5" }}
                xs={{ span: "12" }}
                offset={2}
              >
                <img
                  style={{ width: "240px", height: "110px" }}
                  alt="logo"
                  key={e.bank_id}
                  src={process.env.PUBLIC_URL + "/bank/" + e.bank_id + ".png"}
                />
              </Col>
            ))}
          </Row>
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

export default Main;
