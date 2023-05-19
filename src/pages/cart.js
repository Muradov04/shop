import React, { useEffect } from 'react';
import CartItem from '../components/cart-item';

const Cart = ({ cart, deleteToCart }) => {
  console.log('cart', cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className='d-flex flex-wrap justify=content-around gap-4 mt-4'>
      {cart.map((product, index) => {
        return (
          <CartItem onClick={() => deleteToCart(index)} children='delete to cart' key={index} {...product} />
        );
      })}
    </div>
  );
};

export default Cart;