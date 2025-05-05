import React from 'react';
import { useNavigate } from "react-router-dom";
import { Footer } from '../components/Footer';

const SuccessPage = () => {
    const navigate = useNavigate();  

  return (
    <div className="screen-wrapper d-flex flex-column justify-content-between p-4 bg-white">
        <h1 className="fw-bold mb-4">Order received</h1>
        <div>
            <img src="/assets/images/fireworks.png" alt="Success" className="img-fluid d-block px-4 mb-4" />
            <h3 className="fw-bold text-center mb-3 thank-txt">Thank you!</h3>
            <p className=" text-center info-msg px-4">We have successfully received your order.</p>
        </div>
        <Footer btnText="Submit another order" handleSubmit={() => navigate("/")}/>
    </div>
  );
};

export default SuccessPage;
