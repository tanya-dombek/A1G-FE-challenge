import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { Footer } from "../components/Footer";
import { fetchProductList, submitOrder } from "../api/orderApi";

const HomePage = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState({});
  const [isLoadingStorage, setIsLoadingStorage] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const updateOrder = useCallback((product, newQuantity) => {
    setOrderList(prev => ({
        ...prev,
        [product.name]: newQuantity
    }));
   }, []);
   
   const totalPrice = useMemo(() => {
        return Object.entries(orderList).reduce((total, [productName, quantity]) => {
            const product = productList.find(p => p.name === productName);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    }, [orderList, productList]);

    const handleSubmit = async () => {
        setIsLoadingOrder(true);
    
        const items = Object.entries(orderList)
          .filter(([_, qty]) => qty > 0)
          .map(([name, quantity]) => ({ name, quantity }));
    
        try {
          await submitOrder(items);
          navigate("/success");
        } catch (error) {
          console.error("Order submission failed:", error.response?.data || error.message);
          const message = error.response?.data?.message || "Something went wrong. Please try again.";
          setErrorMessage(message);
        } finally {
          setIsLoadingOrder(false);
        }
    };

    const getProducts = async () => {
        setIsLoadingStorage(true);
        try {
          const storage = await fetchProductList();
          setProductList(storage);
        } catch (error) {
          console.error("Failed to fetch product list:", error);
          setErrorMessage("Failed to fetch product list");
        } finally {
          setIsLoadingStorage(false);
        }
    };
      
    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div className="screen-wrapper d-flex flex-column justify-content-between p-4 bg-white">
        <h1 className="fw-bold mb-4">My Order</h1>
        {
            isLoadingStorage ? (
                <div className="d-flex flex-row gap-2 justify-content-center align-items-center">
                    <div className="spinner-border" role="status"></div>
                    <p className="fw-bold">Loading products...</p>
                </div>
            ) : (!isLoadingStorage && productList.length === 0) ? (
                <div className="d-flex flex-row gap-2 justify-content-center align-items-center">
                    <button type="button" className="btn btn-dark btn-sm" onClick={getProducts}>Retry</button>
                    <p className="fw-bold">No products available.</p>
                </div>
            ) : errorMessage ? (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            ) : (
                <ul className="list-group list-group-flush">
                    {productList.map((product) => (
                        <ProductItem product={product} quantity={orderList[product.name] || 0} key={product.name} updateOrder={updateOrder}/>
                    ))}
                </ul>    
            )
        }
        <Footer btnText="Order" totalPrice={totalPrice} handleSubmit={handleSubmit} isLoading={isLoadingOrder}/>
    </div>
  );
};

export default HomePage;
