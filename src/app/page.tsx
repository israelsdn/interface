'use client';
require('dotenv').config();

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { DefalultInput } from '@/components/DefaultInput';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');

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

    const url = process.env.NEXT_PUBLIC_LOGIN_API as string;

    try {
      await axios
        .post(url, data)
        .then((res) => {
          if (res.status == 200) {
            setApiResponse('Logado com sucesso!');
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 422:
              setApiResponse('Preencha todos os campos!');
              return;
            case 401:
              setApiResponse('Email ou senha invalidos!');
              return;
          }
        });
    } catch (error) {
      setApiResponse('Ocorreu um erro inesperado');
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

        <div
          className={` ${
            apiResponse ? 'block' : 'hidden'
          } bg-red-300 mx-a text-center mb-5 py-1 mx-6 rounded-md`}
        >
          {apiResponse}
        </div>

        <DefalultInput
          type="text"
          value={email}
          onChange={emailInputChange}
          placeholder="Email"
        />

        <DefalultInput
          type="password"
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
          <Link href="./register" className="text-blue-900 font-semibold">
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
}
