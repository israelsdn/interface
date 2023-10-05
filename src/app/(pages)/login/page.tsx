'use client';

import DefaultInput from '@/components/DefaultInput';
import SubmitInput from '@/components/SubmitInput';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import tokenVerify from '@/utils/tokenVerify';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function authetication() {
      const auth = await tokenVerify();

      if (auth) {
        router.push('/home');
      }
    }

    authetication();
  }, []);

  const emailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiLoading(true);

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

            localStorage.setItem('token', res.data);

            const token = localStorage.getItem('token');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log(axios.defaults.headers.common['Authorization']);

            setApiLoading(false);

            router.push('/home');
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 422:
              setApiResponse('Preencha todos os campos!');
              setApiLoading(false);
              return;
            case 401:
              setApiResponse('Email ou senha invalidos!');
              setApiLoading(false);
              return;
          }
        });
    } catch (error) {
      setApiResponse('Ocorreu um erro inesperado');
      setApiLoading(false);
    }
  };

  return (
    <>
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

          <DefaultInput
            type="text"
            value={email}
            onChange={emailInputChange}
            placeholder="Email"
          />

          <DefaultInput
            type="password"
            value={password}
            onChange={passwordInputChange}
            placeholder="Password"
          />

          <SubmitInput value="SING-IN" funName={apiLoading} />

          <p className="max-sm:text-xs max-lg:text-sm text-base text-[#09090B] ml-4 mb-10">
            Don't have login?{' '}
            <Link href="/register" className="text-blue-900 font-semibold">
              Click here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
