'use client';
import 'dotenv/config';

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
            console.log(res.data);
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
    <>
      <header className="bg-[#121214] border-b border-gray-800">
        <div className="flex flex-row-reverse container space-x-7 space-x-reverse items-center">
          <button className="max-sm:text-[10px] max-sm:mr-5 text-xs font-semibold border border-purple-700 rounded-md py-2 px-4 my-4 text-white hover:bg-purple-700 transition duration-300">
            CRIAR CONTA
          </button>

          <div className="flex items-center space-x-2">
            <img src="/user.svg" className="max-sm:w-5 max-sm:h-5 w-4 h-4" />

            <button className="max-sm:hidden text-xs text-white font-semibold">
              ENTRAR
            </button>
          </div>
        </div>
      </header>

      <main className="flex justify-center items-center min-h-screen w-scren bg-[#121214]">
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
      </main>
    </>
  );
}
