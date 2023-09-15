export function DefaultInput({
  placeholder,
  type,
}: {
  placeholder: string;
  type: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="max-sm:text-sm max-lg:text-base text-lg placeholder:text-[#a3a3a7] p-1 border rounded-md border-[#09090B] mb-5 mx-10"
    />
  );
}
