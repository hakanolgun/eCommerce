import React, { useState, useRef } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { postOrder } from "../../api";

function Basket() {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0).toFixed(2);
  const toast = useToast();

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item.title);

    const useremail = JSON.parse(localStorage.getItem("logindata")).email;

    const input = {
      useremail,
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);
    console.log(response);

    emptyBasket();
    onClose();
    toast({
      title: `Tebrikler! Siparişiniz Alındı.`,
      position: "top",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Box className="basketpagecontainer" p="10">
      <Box mb="1rem" textAlign="center">
        <Heading>Shopping Cart</Heading>
      </Box>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket</Alert>
      )}
      {items.length > 0 && (
        <>
          <ul className={styles.basketul}>
            {items.map((item) => (
              <li key={item.id} className={styles.basketli}>
                <Link to={`/product/${item.id}`} className={styles.basketlink}>
                  <Image htmlWidth={100} src={item.image} alt="basket item" />
                </Link>
                <Text className={styles.titletext}>{item.title}</Text>
                <Text className={styles.pricetext}>{item.price} ₺</Text>
                <Button
                  className={styles.basketremovebtn}
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item.id)}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
          <Box maxWidth="700" mt="10">
            <Text fontSize="22" align="right">
              Total: {total} ₺
            </Text>
          </Box>
          <Box maxWidth="700" align="right">
            <Button colorScheme="orange" mt="2" onClick={onOpen}>
              Order
            </Button>
          </Box>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Enter your address here..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
