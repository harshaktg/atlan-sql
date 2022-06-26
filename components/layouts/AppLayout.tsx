import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mx-8 h-[calc(100%-4rem)]">{children}</main>
    </>
  );
}

export default AppLayout;
