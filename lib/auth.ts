import React, { useContext, useEffect } from 'react';
import { api, setToken } from './api';

export const authContext = React.createContext(null);

interface UseAuthReturnValue {
  setToken: (token: string) => void;
  user: {
    id: number;
    username: string;
  } | null;
}

export function useAuth(): UseAuthReturnValue {
  const user = useContext(authContext);
  // Try to load from local storage?
  useEffect(() => {
    const mytoken = localStorage.getItem('token');
    if (mytoken) {
      setToken(mytoken);
      console.log('setToken');
    }
  });

  return {
    setToken: (token) => {
      setToken(token);
      // save in local storage?
      localStorage.setItem('token', token);
    },
    user,
  };
}
