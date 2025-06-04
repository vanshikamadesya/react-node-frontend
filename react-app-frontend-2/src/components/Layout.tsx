import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center mx-auto ">
        <div className="flex-grow w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
