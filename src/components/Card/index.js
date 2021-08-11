import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useBasket } from "../../contexts/BasketContext";
import { useFavor } from "../../contexts/FavorContext";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.6rem 0.1rem;
  width: 48%;
`;

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const { addToFavor, favors } = useFavor();
  const { loggedIn, goToLink } = useAuth();

  const findBasketItem = items.find(
    (basket_item) => basket_item.id === item.id
  );

  const findFavorItem = favors.find((favor_item) => favor_item.id === item.id);
  const myHearthSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="white"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
    </svg>
  );
  const myCartSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />
    </svg>
  );

  return (
    <Box
      className={styles.box}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
    >
      <Link className={styles.link} to={`/product/${item.id}`}>
        <Image
          className={styles.cardImage}
          src={item.image}
          alt="product"
          loading="lazy"
        />
        <Box p="6">
          <Box
            fontSize="medium"
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            {item.title}
          </Box>
          <Box className={styles.pricebox}>₺ {item.price}</Box>
        </Box>
      </Link>
      <Box className={styles.buttonContainer}>
        <Button
          style={{ backgroundColor: findFavorItem ? "purple" : "red" }}
          onClick={loggedIn ? () => addToFavor(item, findFavorItem) : goToLink}
        >
          {myHearthSvg}
        </Button>
        <Button
          style={{
            backgroundColor: findBasketItem ? "purple" : "orange",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: "bolder",
          }}
          onClick={
            loggedIn ? () => addToBasket(item, findBasketItem) : goToLink
          }
        >
          {findBasketItem ? myCartSvg : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
}

export default Card;
