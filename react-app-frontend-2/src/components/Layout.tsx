import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex justify-center mx-auto">
        <div className="flex-grow w-full max-w-screen-xl">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
