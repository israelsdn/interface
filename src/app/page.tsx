'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import tokenVerify from '@/utils/tokenVerify';
import DefaultHeader from '@/components/DefaultHeader';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function authetication() {
      const auth = await tokenVerify();

      if (auth) {
        router.push('/home');
      }
    }

    authetication();
  }, []);

  return (
    <>
      <DefaultHeader>
        <div className="flex flex-row-reverse container space-x-7 space-x-reverse items-center">
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
      </DefaultHeader>

      <main className="flex justify-center items-center min-h-screen w-scren bg-[#121214]"></main>
    </>
  );
}
