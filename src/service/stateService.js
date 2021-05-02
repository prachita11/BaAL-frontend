import axios from "axios";
let SERVER = "https://baal.herokuapp.com/";
//let SERVER = "http://localhost:3001/";
let TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.NjJiMmMzNGItZTA5ZS00OGI3LTk2ZTQtYmQ3NDdkNTgzYjc3.5uewAGSnKlb6JzfnanvDNHkSIiraCByBPObXBMrntzw";
const getStates = async () => {
  try {
    const response = await axios.get(SERVER + "states", {
      headers: {
        Authorization: "Bearer " + TOKEN,
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
        Authorization: "Bearer " + TOKEN,
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
        Authorization: "Bearer " + TOKEN,
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
            Authorization: "Bearer " + TOKEN,
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
            Authorization: "Bearer " + TOKEN,
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

const register = async (user) => {
  try {
    const data = await axios
      .post(`${SERVER}api/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const userLogin = async (user) => {
  try {
    const data = await axios
      .post(`${SERVER}api/login`, {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAPI = async () => {
  try {
    const data = await axios({
      method: "get",
      url: SERVER + "api/",
      responseType: "blob",
    }).then((res) => {
      return res;
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getTransaction = async (api) => {
  try {
    const data = await axios({
      method: "get",
      url: SERVER + "transaction/" + api,
    }).then((res) => {
      return res;
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const getLimit = async (api) => {
  try {
    const data = await axios({
      method: "get",
      url: SERVER + "limit/" + api,
    }).then((res) => {
      return res;
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const updatePass = async (api) => {
  try {
    const data = await axios
      .post(`${SERVER}api/changePass`, api, {
        headers: {
          Authorization: "Bearer " + api.token,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updatePlan = async (api) => {
  try {
    const data = await axios
      .post(`${SERVER}updatePlan`, api, {
        headers: {
          Authorization: "Bearer " + api.token,
        },
        data: {
          email: api.email,
          price: api.price,
          plan: api.plan,
          limit: api.limit,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const resetPass = async (api) => {
  try {
    const data = await axios
      .post(`${SERVER}resetPass`, {
        email: api.email,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const subscribe = async (aa) => {
  try {
    const data = await axios.post(`${SERVER}sub`, aa).then((res) => {
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
  register,
  userLogin,
  getTransaction,
  getLimit,
  updatePass,
  updatePlan,
  resetPass,
  subscribe,
};
