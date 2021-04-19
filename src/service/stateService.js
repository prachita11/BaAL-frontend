import axios from "axios";

const getStates = async () => {
  try {
    const response = await axios.get("http://localhost:3001/states", {
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
    const response = await axios.get(
      "http://localhost:3001/cities/" + state_id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getBanks = async () => {
  try {
    const response = await axios.get("http://localhost:3001/banks", {
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
        `http://localhost:3001/branch`,
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
        `http://localhost:3001/search`,
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
      url: "http://localhost:3001/api/" + email,
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
