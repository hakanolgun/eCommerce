import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useBasket } from "../../contexts/BasketContext";
import { useFavor } from "../../contexts/FavorContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const { addToFavor, favors } = useFavor();

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
          colorScheme={findFavorItem ? "purple" : "red"}
          variant="solid"
          width="50%"
          onClick={() => addToFavor(item, findFavorItem)}
        >
          {myHearthSvg}
        </Button>
        <Button
          colorScheme={findBasketItem ? "purple" : "orange"}
          variant="solid"
          width="50%"
          onClick={() => addToBasket(item, findBasketItem)}
        >
          {findBasketItem ? "Remove from basket" : "Add to Basket"}
        </Button>
      </Box>
    </Box>
  );
}

export default Card;
