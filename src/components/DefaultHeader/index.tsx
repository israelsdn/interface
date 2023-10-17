export default function DefalutHeader({ children, onMouseLeave }: any) {
  return (
    <div
      onMouseLeave={onMouseLeave}
      className="max-sm:h-14 max-lg:h-16 h-20 bg-[#121214] border-b border-gray-800 flex items-center"
    >
      {children}
    </div>
  );
}
