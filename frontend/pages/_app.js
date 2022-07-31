import Navbar from '../components/Navbar'
import '../styles/globals.css'
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import {Footer} from '../components/Footer'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51JCWiQL5SsXqkixGf8QU3gRtUY1dzWgPvufnXW83OavRkYeAUAPY0XDpmR0UIuJK30NvLWv5unI9hSVJx1tdmtnV00M9IcjDTN');
console.log(stripePromise);
function  MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
const [reload, setReload] = useState(1);

useEffect(() => {
  console.log("running use effect");
})
const addToCart = (item, qty, amount) => {
 let newCart = cart
 console.log("Add to cart");
 for (let index = 0; index < qty; index++) {
  console.log("index", index);
   newCart.push([item, amount]);
 }
  setCart(newCart)
  setReload(Math.random())
  console.log("cart", newCart);

}
const removeItem = (item, qty) => {
 let newCart = cart
 let index = newCart.indexOf(item)
 console.log("index", index);
  newCart.splice(index, qty)
  setCart(newCart)
}
const clearCart = () => {
  setCart([]);
}


  return<>
  <Elements stripe={stripePromise}>
  <Navbar key={reload} cart={cart}/>
  <Component addToCart={addToCart} removeItem={removeItem} clearCart={clearCart} cart={cart} {...pageProps} />
  <Footer/> 
  </Elements>
  </>
}

export default MyApp
