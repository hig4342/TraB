import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@modules/reducers';
import { login, logout, UserState } from '@modules/reducers/userReducer'
import { useCallback } from 'react';

export default function useUser() {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();

  const onLogin = useCallback(
    (diff: UserState) => dispatch(login(diff)),
    [dispatch]
  );
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);


  return {
    user,
    onLogin,
    onLogout,
  };
}