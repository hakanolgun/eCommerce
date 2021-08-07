import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find((basket_item) => basket_item.id === item.id);

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
          <Box>₺ {item.price}</Box>
        </Box>
      </Link>
      <Button colorScheme={findBasketItem ? "pink" : "green"} variant="solid" onClick={()=> addToBasket(item, findBasketItem)}>
        {
          findBasketItem ? 'Remove from basket' : "Add to Basket"
        }
      </Button>
    </Box>
  );
}

export default Card;
