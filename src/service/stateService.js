import axios from "axios";
let SERVER = "https://baal.herokuapp.com/";
//let SERVER="http://localhost:3001/"
const getStates = async () => {
  try {
    const response = await axios.get(SERVER + "states", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getCities = async (state_id) => {
  try {
    const response = await axios.get(SERVER + "cities/" + state_id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getBanks = async () => {
  try {
    const response = await axios.get(SERVER + "banks", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getResults = async (state_id, city_id, bank_id, type) => {
  try {
    const data = await axios
      .post(
        ` ${SERVER}branch`,
        {
          city_id: city_id,
          bank_id: bank_id,
          state_id: state_id,
          type: type,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
          },
        }
      )
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getKeywordResults = async (state, city, bank, keyword) => {
  try {
    const data = await axios
      .post(
        `${SERVER}search`,
        {
          state: state,
          city: city,
          bank: bank,
          keyword: keyword,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
          },
        }
      )
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAPI = async (email) => {
  try {
    const data = await axios({
      method: "get",
      url: SERVER + "api/" + email,
      responseType: "blob",
    }).then((res) => {
      return res;
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export {
  getStates,
  getCities,
  getBanks,
  getResults,
  getKeywordResults,
  getAPI,
};
