import axios from "axios";

// Fetch all products from storage
export const fetchProductList = async () => {
  const res = await axios.get("/api/storage");
  return res.data.storage;
};

// Submit an order
export const submitOrder = async (items) => {
  const res = await axios.post("/api/order", { items });
  return res.data;
};