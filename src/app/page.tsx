import { DefaultInput } from '../components/input';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="flex flex-col bg-white rounded-3xl max-sm:w-72 max-lg:w-80 w-96">
        <h1 className="max-sm:text-xl max-lg:text-2xl text-3xl font-bold mt-8 mb-8 text-center">
          LOGIN
        </h1>

        <DefaultInput placeholder="Email" type="text" />

        <DefaultInput placeholder="Password" type="password" />

        <button className="max-sm:text-sm max-lg:text-base text-lg bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl w-3/5 mt-6 mb-8 mx-auto">
          SING-IN
        </button>

        <p className="max-sm:text-xs max-lg:text-sm text-base text-[#09090B] ml-4 mb-10">
          Don't have login?{' '}
          <button className="text-blue-900 font-semibold">Click here.</button>
        </p>
      </div>
    </div>
  );
}
