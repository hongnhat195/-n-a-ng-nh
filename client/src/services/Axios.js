import axios from 'axios';
export const END_POINT = 'http://localhost:5000'
const Axios = axios.create({ baseURL: END_POINT });

export default Axios;
