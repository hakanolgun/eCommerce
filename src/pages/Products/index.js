import React from "react";
import Card from "../../components/Card";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { fetchProductList } from "../../api";

function Products() {
  const { mySearched, myInputBool } = useAuth();

  const { isLoading, error, data } = useQuery("products", fetchProductList);
  if (isLoading) return "Loading...";
  if (error) return "an aerror occured";
  // console.log("data", data);

  return (
    <div className="productsPageContainer">
      <Grid
        p="1rem"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={8}
      >
        {myInputBool
          ? mySearched.map((item, key) => <Card key={key} item={item} />)
          : data.map((item, key) => <Card key={key} item={item} />)}
      </Grid>
    </div>
  );
}

export default Products;
