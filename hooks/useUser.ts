import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@reducers/rootReducer';
import { login, logout, User } from '@reducers/userReducer'
import { useCallback } from 'react';

export default function useUser() {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin)
  const dispatch = useDispatch()

  const onLogin = useCallback(
    (diff: User) => dispatch(login(diff)),
    [dispatch]
  )
  const onLogout = useCallback(() => dispatch(logout()), [dispatch])


  return {
    user,
    isLogin,
    onLogin,
    onLogout,
  }
}