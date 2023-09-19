export function DefalultInput({
  placeholder,
  type,
  value,
  onChange,
}: {
  placeholder: string;
  type: string;
  value?: any;
  onChange?: any;
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="max-sm:text-sm max-lg:text-base text-lg placeholder:text-[#a3a3a7] p-1 border rounded-md border-[#09090B] mb-5 mx-auto"
    />
  );
}
