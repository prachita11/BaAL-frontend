import axios from "axios";

const getStates=async()=>{
    try {
        const response = await axios.get('https://baal.herokuapp.com/states');
        return response;
      } catch (error) {
        console.error(error);
      }
}

const getCities = async (state_id)=>{
  try {
    const response = await axios.get('https://baal.herokuapp.com/cities/'+state_id);
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getBanks=async()=>{
  try {
      const response = await axios.get('https://baal.herokuapp.com/banks');
      return response;
    } catch (error) {
      console.error(error);
    }
}

const getResults=async(state_id ,city_id,bank_id,type)=>{
  try {
    const data = await axios.post(`https://baal.herokuapp.com/branch`, { city_id:city_id,bank_id:bank_id , state_id:state_id ,type:type}).then((res) => {
       return res.data;
    });
    console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
}

const getKeywordResults=async(search)=>{
  try {
    const data = await axios.post(`https://baal.herokuapp.com/search`, { arr:search}).then((res) => {
       return res.data;
    });
      return data;
    } catch (error) {
      console.error(error);
    }
}
export {getStates ,getCities,getBanks ,getResults,getKeywordResults}  
