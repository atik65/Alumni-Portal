import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosRequest = async ({ ...options }) => {
  const onSuccess = (res) => {
    return res.data;
  };
  const onError = (err) => {
    throw err.response.data;
  };

  return axios(options).then(onSuccess).catch(onError);
};

export default axiosRequest;
