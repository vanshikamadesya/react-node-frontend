import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { getCurrentUser } from '../store/slices/authSlice';

const Layout = () => {
  const dispatch = useAppDispatch();
  const hasFetchedUser = useAppSelector(state => state.auth.hasFetchedUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!hasFetchedUser) {
    return <div>Loading application...</div>; // Or a better spinner
  }

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
