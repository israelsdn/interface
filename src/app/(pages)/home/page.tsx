'use client';

import DefaultHeader from '@/components/DefaultHeader';
import tokenVerify from '@/utils/tokenVerify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [menuStatus, setMenuStatus] = useState(false);

  useEffect(() => {
    async function authetication() {
      const auth = await tokenVerify();

      if (!auth.status) {
        router.push('/');
      }

      if (auth.status) {
        let { name }: any = auth.data;
        setUserName(name);
      }
    }

    authetication();
  }, []);

  function logOut() {
    localStorage.clear();
    router.push('/');
  }

  function openMenu() {
    if (menuStatus) {
      setMenuStatus(false);
    } else {
      setMenuStatus(true);
    }
  }

  return (
    <>
      <DefaultHeader>
        <div className="flex flex-row-reverse container space-x-7 space-x-reverse items-center">
          <button
            onClick={openMenu}
            className="max-sm:w-12 max-sm:h-12 max-lg:w-14 max-lg:h-14 w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center border-4 border-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <span className="text-2xl font-medium text-white">
              {userName[0]}
            </span>
          </button>
        </div>
      </DefaultHeader>

      <main className="flex min-h-screen w-scren bg-[#121214]">
        <div
          className={` ${
            menuStatus ? 'block' : 'hidden'
          } flex flex-row-reverse container space-x-reverse`}
        >
          <div className="h-min w-min mt-2 rounded-md bg-gray-700 text-white">
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href=""
                className="block px-4 py-2 text-white hover:bg-gray-900 "
                role="menuitem"
              >
                Editar Perfil
              </a>
              <a
                href=""
                className="block px-4 py-2 text-white hover:bg-gray-900"
                role="menuitem"
              >
                Configurações
              </a>
              <a
                href=""
                onClick={logOut}
                className="block px-4 py-2 text-white hover:bg-gray-900"
                role="menuitem"
              >
                Log Out
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
