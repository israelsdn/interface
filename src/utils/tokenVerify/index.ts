import axios from 'axios';

export default async function tokenVerify() {
  let status = false;
  const token = localStorage.getItem('token');
  const url = process.env.NEXT_PUBLIC_VERIFY_TOKEN as string;
  const data = { token: token };

  if (token) {
    try {
      await axios
        .post(url, data)
        .then(() => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('valido');
          status = true;
        })
        .catch(() => {
          localStorage.clear();
          console.log('invalido');
          status = false;
        });
    } catch (error) {}
  }

  return status;
}
