'use client';

import axios from 'axios';
import { useState } from 'react';

export default function token() {
  const [tokenString, setTokenString] = useState('');

  const tokenInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenString(event.target.value);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = process.env.NEXT_PUBLIC_VERIFY_TOKEN as string;

    const data = {
      token: tokenString,
    };

    try {
      await axios
        .post(url, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          console.log('erro: ' + res.data);
        });
    } catch (error) {
      console.log(console.log(error));
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" onChange={tokenInputChange} />
        <button type="submit">testar</button>
      </form>
    </div>
  );
}
