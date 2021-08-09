import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { useFavor } from "../../contexts/FavorContext";
import { useQuery } from "react-query";

import { fetchProductList } from "../../api";

function Navbar() {
  const { loggedIn, user, setMySearched, mySearched, setMyInputBool } =
    useAuth();
  const { items } = useBasket();
  const { favors, myHearthSvg, myCartSvg, myProfileSvg } = useFavor();

  const { isLoading, error, data } = useQuery("products", fetchProductList);
  if (isLoading) return "Loading...";
  if (error) return "an aerror occured";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const mySearchWord = e.target.value.toLowerCase();
    if (mySearchWord && mySearchWord !== "") {
      setMyInputBool(true);
      const mySearchResults = data.filter((item) =>
        item.title.toLowerCase().split(" ").includes(mySearchWord)
      );
      console.log(mySearchResults);
      setMySearched(mySearchResults);
      console.log("mySearched is: ", mySearched);
      console.log(mySearched.length);
    }else{
      setMyInputBool(false);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">ClothesStore</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.navbarFormContainer}>
        <form action="">
          <FormControl id="search">
            <InputGroup>
              <Input
                type="search"
                placeholder="Search..."
                onChange={handleSearchSubmit}
              />
              <InputRightElement
                children={
                  <Button className={styles.SearchFormSubmit} type="submit">
                    &#128269;
                  </Button>
                }
              />
            </InputGroup>{" "}
          </FormControl>
        </form>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button className={styles.registerBtns} colorScheme="purple">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className={styles.registerBtns} colorScheme="purple">
                Register
              </Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {favors.length > 0 && (
              <Link to="/favor">
                <Button colorScheme="purple" variant="outline">
                  {myHearthSvg}
                  <sup>{favors.length}</sup>
                </Button>
              </Link>
            )}
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="purple" variant="outline">
                  {myCartSvg} <sup>{items.length}</sup>
                </Button>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="red" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button colorScheme="purple">{myProfileSvg}</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
