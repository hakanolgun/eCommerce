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
  const myHearthSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="blueviolet"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
    </svg>
  );
  const myProfileSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
    </svg>
  );

  const myCartSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="blueviolet"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />
    </svg>
  );
  const emptyFavor = () => setFavors([]);

  const values = {
    favors,
    setFavors,
    addToFavor,
    removeFromFavor,
    emptyFavor,
    myHearthSvg,
    myProfileSvg,
    myCartSvg,
  };

  return (
    <FavorContext.Provider value={values}>{children}</FavorContext.Provider>
  );
};

const useFavor = () => useContext(FavorContext);

export { FavorProvider, useFavor };
