'use client';

import DefalultInput from '@/components/DefaultInput';
import SubmitInput from '@/components/SubmitInput';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import tokenVerify from '@/utils/tokenVerify';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [name, setName] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function authetication() {
      const auth = await tokenVerify();

      if (auth.status) {
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

  const confPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfPassword(event.target.value);
  };

  const nameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiLoading(true);

    const data = {
      email,
      password,
      confPassword,
      name,
    };

    const url = process.env.NEXT_PUBLIC_REGISTER_API as string;

    try {
      await axios
        .post(url, data)
        .then((res) => {
          if (res.status == 201) {
            setApiResponse('Usuario criado com sucesso!');
            setApiLoading(false);
            router.push('/login');
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 422:
              setApiResponse('Preencha todos os campos!');
              setApiLoading(false);
              return;
            case 400:
              setApiResponse('As senhas não coincidem!');
              setApiLoading(false);
              return;
            case 409:
              setApiResponse('Email já está em uso!');
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
      <main className="flex justify-center items-center min-h-screen w-screen bg-[#121214]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white rounded-3xl max-sm:w-72 max-lg:w-80 w-96"
        >
          <h1 className="max-sm:text-lg max-lg:text-xl text-2xl font-bold mt-8 mb-8 text-center">
            CREATE YOUR ACCOUNT
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
            placeholder="Your email"
            value={email}
            onChange={emailInputChange}
          />

          <DefalultInput
            type="text"
            placeholder="Your name"
            value={name}
            onChange={nameInputChange}
          />

          <DefalultInput
            type="password"
            placeholder="Your password"
            value={password}
            onChange={passwordInputChange}
          />

          <DefalultInput
            type="password"
            placeholder="Confirm your password"
            value={confPassword}
            onChange={confPasswordInputChange}
          />

          <SubmitInput value="REGISTER" funName={apiLoading} />

          <p className="max-sm:text-xs max-lg:text-sm text-base text-[#09090B] ml-4 mb-10">
            Have an account?{' '}
            <Link href="/login" className="text-blue-900 font-semibold">
              Click here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
