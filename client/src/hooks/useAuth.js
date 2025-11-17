import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading } = useSelector(state => state.auth);

  const login = (userData) => {
    dispatch(setCredentials(userData));
    localStorage.setItem('refreshToken', userData.refreshToken);
  };

  const logoutUser = () => {
    dispatch(logout());
  };

    const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout: logoutUser,
    isAdmin
  };
};