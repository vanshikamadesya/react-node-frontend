import { useEffect } from 'react';
import { useAppDispatch } from './store/hook';
import { getCurrentUser } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
  <></>
  );
};

export default App;