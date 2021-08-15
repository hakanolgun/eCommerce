import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [`https://610eb0c37f793c0017419593.mockapi.io`];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    //Do sth with request error
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    "https://610eb0c37f793c0017419593.mockapi.io/products"
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `https://610eb0c37f793c0017419593.mockapi.io/products?id=${id}`
  );

  return data;
};

export const postProduct = async (input) => {
  const { data } = await axios.post(
    `https://610eb0c37f793c0017419593.mockapi.io/products`,
    input
  );

  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `https://610eb0c37f793c0017419593.mockapi.io/users`, input
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.get(
    `https://610eb0c37f793c0017419593.mockapi.io/users`
  );
  let newdata = data.filter((item) => item.email === input.email);
  if (newdata.length !== 1) {
    newdata = false;
  }
  return newdata;
};

export const fetchMe = async () => {
  const { data } = await axios.get(
    `https://610eb0c37f793c0017419593.mockapi.io/users`
  );
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `https://610eb0c37f793c0017419593.mockapi.io/users`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `https://610eb0c37f793c0017419593.mockapi.io/order`,
    input
  );

  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(
    `https://610eb0c37f793c0017419593.mockapi.io/order`
  );

  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `https://610eb0c37f793c0017419593.mockapi.io/products/:${product_id}`
  );

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `https://610eb0c37f793c0017419593.mockapi.io/products/${product_id}`,
    input
  );
  return data;
};
