import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hook';
import { getCurrentUser } from './store/slices/authSlice';
import { RouterProvider } from 'react-router-dom';
import router from './router/index.js';

function App() {
  // const dispatch = useAppDispatch();
  // const hasFetchedUser = useAppSelector(state => state.auth.hasFetchedUser);

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  // if (!hasFetchedUser) {
  //   return <div>Loading...</div>; // or a better spinner
  // }

  return (
    // <RouterProvider router={router} />
    <></> // App component is now just a placeholder or can be removed
  );
}

export default App;
