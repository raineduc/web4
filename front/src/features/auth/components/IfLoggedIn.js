import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isUserLoggedIn } from '../logic/auth';

const AuthChecked = ({ children, fallback, isAuthenticated }) => (isAuthenticated
  ? children
  : fallback);

export const IfLoggedIn = ({ children, fallback, renderOnLoading }) => {
  const dispatch = useDispatch();
  const hasAuthCheckedBefore = useSelector((state) => state.auth.hasAuthCheckedBefore);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!hasAuthCheckedBefore) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return hasAuthCheckedBefore
    ? <AuthChecked fallback={fallback} isAuthenticated={isAuthenticated}>{children}</AuthChecked>
    : renderOnLoading;
};
