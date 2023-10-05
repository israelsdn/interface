export default function SubmitInput({
  value,
  funName,
}: {
  funName?: boolean;
  value?: string;
}) {
  return (
    <input
      value={value}
      type="submit"
      className={`${
        funName ? 'opacity-50 cursor-not-allowed' : ''
      } max-sm:text-sm max-lg:text-base text-lg bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-xl w-3/5 mt-6 mb-8 mx-auto`}
      disabled={funName}
    />
  );
}
