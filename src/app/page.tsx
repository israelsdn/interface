'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    async function tokenVerify() {
      const url = process.env.NEXT_PUBLIC_VERIFY_TOKEN as string;

      const data = {
        token: token,
      };

      try {
        await axios
          .post(url, data)
          .then(() => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          })
          .catch(() => {
            localStorage.clear();
          });
      } catch (error) {}
    }

    if (token) {
      tokenVerify();
    }
  }, []);

  return (
    <>
      <header className="bg-[#121214] border-b border-gray-800">
        <div className="flex flex-row-reverse container space-x-7 space-x-reverse items-center h-16">
          <Link href="/register" className="h-min">
            <button className="max-md:text-[10px] max-sm:mr-5 text-xs font-semibold border border-purple-700 rounded-md py-2 px-4 text-white hover:bg-purple-700 transition duration-300">
              CRIAR CONTA
            </button>
          </Link>

          <Link href="/login" className="flex items-center space-x-2">
            <img src="/user.svg" className="max-md:w-5 max-md:h-5 w-4 h-4" />

            <button className="max-md:hidden text-xs text-white font-semibold">
              ENTRAR
            </button>
          </Link>
        </div>
      </header>

      <main className="flex justify-center items-center min-h-screen w-scren bg-[#121214]"></main>
    </>
  );
}
