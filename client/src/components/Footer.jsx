import React from 'react';

export const Footer = ({btnText, totalPrice, handleSubmit, isLoading = false}) => {
    
  return (
    <div className="sticky-bottom sticky-container px-4 pt-4 bg-white">
        {(totalPrice ?? 0) > 0 && 
            (<div className='d-flex flex-row justify-content-between align-items-center mb-3'>
                <h5 className='fw-bold'>Total</h5>
                <h4 className='fw-bold'>${totalPrice.toFixed(2)}</h4>
            </div>)}
        <button className="btn btn-primary w-100 py-2 order-btn fw-bold " 
            onClick={handleSubmit}
            disabled={totalPrice === 0}>
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Sending order...</span>
                    </>
                ) : btnText}
        </button>
    </div>
  )
}
