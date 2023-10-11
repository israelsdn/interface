import { data } from 'autoprefixer';
import axios from 'axios';

export default async function tokenVerify() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = token;

  const url = process.env.NEXT_PUBLIC_VERIFY_TOKEN as string;
  let response = {
    status: false,
    data,
  };

  if (token) {
    try {
      await axios
        .post(url)
        .then((res) => {
          response.status = true;
          response.data = res.data;
        })
        .catch(() => {
          localStorage.clear();
          axios.defaults.headers.common.Authorization = undefined;

          response.status = false;
        });
    } catch (error) {}
  }

  return response;
}
