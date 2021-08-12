import { useState, createContext, useContext, useEffect } from "react";
import { fetchMe, fetchLogout } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mySearched, setMySearched] = useState([]);
  const [myInputBool, setMyInputBool] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const logindata = JSON.parse(localStorage.getItem("logindata"));
        const me = await fetchMe();

        if (logindata !== null) {
          const newme = me.filter((item) => item.email === logindata.email);
          setLoggedIn(true);
          setUser(newme[0]);
        }

        setLoading(false);
      } catch (e) {
        console.log("useeffect", e);
        setLoading(false);
      }
    })();
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data);
    localStorage.setItem("logindata", JSON.stringify(data));
  };

  //callback'i çıkış yaptıktan sonra anasayfaya yönlendirme yapmak için ekledik.
  const logout = async (callback) => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("logindata");
    await fetchLogout();
    callback();
  };

  const goToLink = () => {
    const linkElement = document.getElementsByClassName("registerLink")[0];
    linkElement.click();
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
    mySearched,
    setMySearched,
    myInputBool,
    setMyInputBool,
    goToLink,
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="red"
        />
      </Flex>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
