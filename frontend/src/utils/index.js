import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const serverAxios = axios.create({
  baseURL: REACT_APP_API_URL
});
export { serverAxios };
