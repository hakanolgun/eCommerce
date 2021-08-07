import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import styles from "./styles.module.css";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error.</div>;
  }

  console.log(product_id);
  console.log("productDetails data", data);


  const myProduct = data.filter((item) => item.id == product_id)[0];
  console.log(myProduct);

  // const myProductArray = data.filter(function (item) {
  //   return Number(item.id) === Number(product_id);
  // });

  // const myProduct = myProductArray[0];
  
  const findBasketItem = items.find((item) => {
    return Number(item.id) === Number(product_id);
  });


  const images = [
    {
      original: myProduct.image,
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
    },
  ];

  return (
    <div className={styles.productDetailContainerDiv}>
      <Button colorScheme={findBasketItem ? "pink" : "green"} ml="6" onClick={() => addToBasket(myProduct, findBasketItem)}>
        {findBasketItem ? "Remove from basket" : "Add to Basket"}
      </Button>
      <Text as="h2" fontSize="2xl" textAlign="center" marginBlock="10">
        {myProduct.title}
      </Text>
     
      <Box>
        <ImageGallery items={images}></ImageGallery>
      </Box>
      <p className={styles.description}>{myProduct.description}</p>
    </div>
  );
}

export default ProductDetail;
