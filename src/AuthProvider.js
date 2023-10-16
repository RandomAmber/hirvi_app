import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  auth: false,
  setAuth: () => {},
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        //setUser(localStorage.get('user'));
      } catch(error) {
        //setUser(null);
      };
    };

    isAuth();
  }, [auth]);


  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;