import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hook';
import { getCurrentUser } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const hasFetchedUser = useAppSelector(state => state.auth.hasFetchedUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!hasFetchedUser) {
    return <div>Loading...</div>; // or a spinner
  }

 
}

export default App;
