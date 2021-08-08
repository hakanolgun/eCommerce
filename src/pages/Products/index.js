import React from "react";
import Card from "../../components/Card";
import { Grid, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { fetchProductList } from "../../api";

function Products() {
  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery("products", fetchProductList, {
  //   getNextPageParam: (lastGroup, allGroups) => {
  //     const morePagesExist = lastGroup?.length === 12;
  //     //backend'de controller/product/index.js'de limit de 12 olmalı ki çalışsın

  //     if (!morePagesExist) {
  //       return;
  //     }
  //     return allGroups.length + 1;
  //   },
  // });

  // if (status === "loading") return "Loading...";

  // if (error === "error") return "An error has occurred: " + error.message;

  // console.log("data", data);

  const { isLoading, error, data } = useQuery("products", fetchProductList);

  if (isLoading) return "Loading...";
  if (error) return "an aerror occured";
  // console.log("data", data);

  return (
    <div>
      <Grid
        p="1rem"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={8}
      >
        {data.map((item, key) => (
          <Card key={key} item={item} />
        ))}
        {/* {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box w="100%" key={item.id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))} */}
      </Grid>

      <Flex mt="10" justifyContent="center">
        {/* <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button> */}
      </Flex>
    </div>
  );
}

export default Products;
