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
        console.log("logindata", logindata); 
        const me = await fetchMe();
        const newme = me.filter(item => item.email == logindata.email);
        console.log("newme", newme);

        if(logindata){
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

  const goToRegister = () => {
    let mylink = document.createElement("a");
    mylink.setAttribute("href", "/signup");
    console.log(mylink);
    mylink.click();
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
    goToRegister
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
