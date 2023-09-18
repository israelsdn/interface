'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    console.log(data);

    try {
      await axios.post('http://localhost:3005/user/login', data).then((res) => {
        console.log('resp:', res.data);
      });
    } catch (error) {
      console.log('Erro ao chamar a API:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-scren bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-3xl max-sm:w-72 max-lg:w-80 w-96"
      >
        <h1 className="max-sm:text-xl max-lg:text-2xl text-3xl font-bold mt-8 mb-8 text-center">
          LOGIN
        </h1>

        <input
          type="text"
          className="max-sm:text-sm max-lg:text-base text-lg placeholder:text-[#a3a3a7] p-1 border rounded-md border-[#09090B] mb-5 mx-auto"
          value={email}
          onChange={emailInputChange}
          placeholder="Email"
        />

        <input
          type="password"
          className="max-sm:text-sm max-lg:text-base text-lg placeholder:text-[#a3a3a7] p-1 border rounded-md border-[#09090B] mb-5 mx-auto"
          value={password}
          onChange={passwordInputChange}
          placeholder="Password"
        />

        <input
          type="submit"
          value="SING-IN"
          className="max-sm:text-sm max-lg:text-base text-lg bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl w-3/5 mt-6 mb-8 mx-auto"
        />

        <p className="max-sm:text-xs max-lg:text-sm text-base text-[#09090B] ml-4 mb-10">
          Don't have login?{' '}
          <button className="text-blue-900 font-semibold">Click here.</button>
        </p>
      </form>
    </div>
  );
}
