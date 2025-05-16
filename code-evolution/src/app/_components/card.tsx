export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-24 m-2 shadow-lg border border-gray-300 flex justify-center items-center">
      {children}
    </div>
  );
};
