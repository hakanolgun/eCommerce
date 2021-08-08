import { useState, createContext, useContext, useEffect } from "react";

const FavorContext = createContext();

const defaultFavor = JSON.parse(localStorage.getItem("favor")) || [];

const FavorProvider = ({ children }) => {
  const [favors, setFavors] = useState(defaultFavor);

  useEffect(() => {
    localStorage.setItem("favor", JSON.stringify(favors));
  }, [favors]);

  const addToFavor = (myProduct, findFavorItem) => {
    if (!findFavorItem) {
      return setFavors((items) => [...items, myProduct]);
    }
    const filtered = favors.filter((item) => item.id !== findFavorItem.id);
    setFavors(filtered);
  };

  const removeFromFavor = (item_id) => {
    const filtered = favors.filter((item) => item.id !== item_id);
    setFavors(filtered);
  };

  const emptyFavor = () => setFavors([]);

  const values = {
    favors,
    setFavors,
    addToFavor,
    removeFromFavor,
    emptyFavor
  };

  return (
    <FavorContext.Provider value={values}>{children}</FavorContext.Provider>
  );
};

const useFavor = () => useContext(FavorContext);

export { FavorProvider, useFavor };
