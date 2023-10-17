'use client';

import AccountModal from '@/components/AccountModal';
import DefaultHeader from '@/components/DefaultHeader';
import tokenVerify from '@/utils/tokenVerify';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

  const openMenu = () => setMenuStatus(true);
  const closeMenu = () => setMenuStatus(false);

  return (
    <main className="min-h-screen w-scren bg-[#121214]">
      <DefaultHeader>
        <div className=" flex flex-row-reverse container space-x-7 space-x-reverse items-center">
          <button
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            className="max-sm:mx-4 max-sm:w-12 max-sm:h-12 max-lg:w-14 max-lg:h-14 w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center border-4 border-gray-700 "
          >
            <span className="text-2xl font-medium text-white">
              {userName[0]}
            </span>
          </button>
        </div>

        <div className={`${menuStatus ? 'block' : 'hidden'} h-fit w-fit`}>
          <div
            className="mt-2 rounded-md bg-gray-700 text-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href=""
              className="max-sm:text-xs  block px-4 py-2 text-white hover:bg-gray-900 rounded-md"
              role="menuitem"
            >
              Editar Perfil
            </a>
            <a
              href=""
              onClick={logOut}
              className="max-sm:text-xs block px-4 py-2 text-white hover:bg-gray-900 rounded-md"
              role="menuitem"
            >
              Sair
            </a>
          </div>
        </div>
      </DefaultHeader>
    </main>
  );
}
