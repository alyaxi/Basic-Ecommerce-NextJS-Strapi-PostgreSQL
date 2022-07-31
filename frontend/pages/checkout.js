import { list } from "postcss";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const checkout = ({ cart }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    stripeId: "",
  });
  useEffect(() => {
    console.log("useEffect is runing");
    let total = 0;
    for (let index = 0; index < cart.length; index++) {
      let element = cart[index];
      total = total + element[1];
    }
    setSubTotal(total);
  }, []);
  
  const handleForm = (e) => {
    e.preventDefault();
    const updateItem = (form[e.target.name] = e.target.value);
    setForm({ ...form, updateItem });
    console.log(form);
  };
  const orderSubmit = async (event) => {
    event.preventDefault();
    const cardElement = await elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement, options);
    console.log(token);
    console.log("err", error);
    const userToken = Cookies.get("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
        dishes: appContext.cart.items,
        address: data.address,
        city: data.city,
        state: data.state,
        token: token.token.id,
      }),
    });

    if (!response.ok) {
      setError(response.statusText);
    }
  };
  console.log(cart);
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col   mb-12">
            <h1 className="sm:text-3xl text-2xl mx-auto font-bold title-font mb-4 text-gray-900">
              Checkout
            </h1>
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Cart Details
            </h2>
            <div className="lg:w-2/3 leading-relaxed text-base pb-2">
              <p className="mb-4">
                {cart.length ? "Your items as follows" : "Your cart is empty"}
              </p>
              <ul className="list-decimal px-4">
                {cart.map((item) => {
                  return (
                    <li key={item[1]}>
                      {item[0]} price of ${item[1]}
                    </li>
                  );
                })}
              </ul>
              <div className="font-bold text-2xl mt-2">
                Subtotal: {subTotal}
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleForm}
                    type="text"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleForm}
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    onChange={handleForm}
                    type="phone"
                    placeholder="Enter your phone number"
                    id="phone"
                    name="phone"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                    onChange={handleForm}
                    id="address"
                    placeholder="Enter your complete address"
                    name="address"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              <div className="p-2 w-full">
                <button
                  onClick={orderSubmit}
                  className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default checkout;
