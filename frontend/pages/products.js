import Link from "next/link";
import React from "react";

const products = ({ product }) => {
  const { data } = product;
  console.log(data);
  return (
    <div className="container mx-auto">
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Product List - Shop Art
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className=" flex xl:w-1/4 md:w-1/2 p-4">
            <div className=" flex justify-between  bg-gray-100 p-6 rounded-lg">
              {data.map(({ attributes: item }, index) => (
                <div className="flex border-2  border-gray-200 ml-4 bg-gray-200 py-4  px-4 " key={index}>
                  <div className="flex flex-col">
                  <img
                    className="h-40 rounded w-full  object-center mb-6"
                    src={item.image.data.attributes.name}
                    alt="content"
                  />

                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {item.catgory}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    {item.title}
                  </h2>
                  <p className="leading-relaxed text-base text-b font-bold">
                    Price: ${item.amount}
                  </p>
                  <div className="flex my-4">
                    <span className=" text-start font-semibold">Color</span>
                  
                    <button
                      className={`border-2 border-gray-300 ml-1 bg-${item.color !== "black" && "white" ? item.color+"-800" : item.color } rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    <div className="flex ml-20 font-semibold">
                      <span className=" text-start mx-1 text0-bold">Size:</span>
                    <p>{item.Size}</p>
                    </div>


                  </div>
                  <Link href={`product/${item.slug}`}>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 mt-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                      View Product
                    </button>
                  </Link>
                </div>
                      </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default products;
export async function getServerSideProps(context) {
  let a = await fetch("http://localhost:1337/api/products?populate=*");
  let product = await a.json();
  console.log(product);
  return { props: { product } };
}
