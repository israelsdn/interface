'use client';

import DefaultHeader from '@/components/DefaultHeader';

export default function home() {
  return (
    <>
      <DefaultHeader>
        <div className="flex flex-row-reverse container space-x-7 space-x-reverse items-center"></div>
      </DefaultHeader>

      <main className="flex justify-center items-center min-h-screen w-scren bg-[#121214]"></main>
    </>
  );
}
