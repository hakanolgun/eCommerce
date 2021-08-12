import React from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import styles from "./styles.module.css";
import { useBasket } from "../../contexts/BasketContext";
import { useFavor } from "../../contexts/FavorContext";
import { useAuth } from "../../contexts/AuthContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const { addToFavor, favors } = useFavor();
  const { loggedIn, goToLink } = useAuth();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  const myProduct = data.filter(
    (item) => Number(item.id) === Number(product_id)
  )[0];
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

  const myHomeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z" />
    </svg>
  );

  const findBasketItem = items.find((item) => {
    return Number(item.id) === Number(product_id);
  });
  const findFavorItem = favors.find((item) => {
    return Number(item.id) === Number(product_id);
  });

  const images = [
    {
      original: myProduct.image,
    },
    {
      original:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80",
    },
  ];

  return (
    <div className={styles.productDetailContainerDiv}>
      <Link to="/">
        <Button colorScheme="green" ml="6">
          {myHomeSvg}
        </Button>
      </Link>
      <Button
        colorScheme={findFavorItem ? "purple" : "red"}
        ml="6"
        onClick={
          loggedIn ? () => addToFavor(myProduct, findFavorItem) : goToLink
        }
      >
        {findFavorItem ? "Remove" : myHearthSvg}
      </Button>

      <Button
        colorScheme={findBasketItem ? "purple" : "orange"}
        ml="6"
        onClick={
          loggedIn ? () => addToBasket(myProduct, findBasketItem) : goToLink
        }
      >
        {findBasketItem ? "Remove" : myCartSvg}
      </Button>
      <Text as="h2" fontSize="2xl" textAlign="center" marginBlock="10">
        {myProduct.title}
      </Text>
      <Text as="h3" fontSize="2xl" textAlign="center" marginBlock="10">
        ₺ {myProduct.price}
      </Text>

      <Box>
        <ImageGallery items={images}></ImageGallery>
      </Box>
      <Text mt="3rem" className={styles.description}>
        {myProduct.description}
      </Text>
    </div>
  );
}

export default ProductDetail;
