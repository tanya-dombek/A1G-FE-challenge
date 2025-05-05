import React from 'react';

const ProductItem = React.memo(({ product, quantity, updateOrder }) => {
    const isOutOfStock = product.stock === 0;

  return (
    <li className={`list-group-item d-flex flex-row justify-content-between align-items-center py-4 px-0 ${isOutOfStock ? "disabled" : ""}`}>
        <div className={`d-flex flex-row gap-4 align-items-center ${isOutOfStock ? "out-of-stock" : ""}`}>
            <img src={`/assets/images/${product.name.toLowerCase()}.png`} alt={product.name} className="img-ratio"/>
            <div>
                <h5 className='product-name'>{product.name}</h5>
                <p className='price-text'>${product.price.toFixed(2)}</p>
            </div>
        </div>
        <div className={`d-flex flex-row align-items-center gap-2 ${isOutOfStock ? "out-of-stock" : ""}`}>
            <h5>{quantity}</h5>
            <button className="btn round-btn fw-bold"
                disabled={!isOutOfStock && quantity === 0}
                onClick={() => updateOrder(product, Math.max(0, quantity - 1))}
                aria-label={`Decrease quantity for ${product.name}`}>-</button>
            <button className="btn round-btn fw-bold"
                disabled={!isOutOfStock && quantity >= product.stock}
                onClick={() => updateOrder(product, Math.min(product.stock, quantity + 1))}
                aria-label={`Increase quantity for ${product.name}`}>+</button>
        </div>
    </li>
  );
});

export default ProductItem;
