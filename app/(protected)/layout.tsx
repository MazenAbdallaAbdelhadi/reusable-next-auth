import Navbar from "./_components/navbar";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="py-4 min-h-full w-full flex flex-col justify-center items-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;
