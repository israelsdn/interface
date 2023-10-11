export default function DefalutHeader({ children }: any) {
  return (
    <header className="max-sm:h-14 max-lg:h-16 h-20 bg-[#121214] border-b border-gray-800 flex items-center">
      {children}
    </header>
  );
}
