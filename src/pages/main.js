import React, { useEffect, useState } from "react";
import { Routes, Route, json } from "react-router-dom";
import Container from "react-bootstrap/Container";
import products from "../data/products.json";
import Header from "../components/header";
import Home from "./home";
import Cart from "./cart";
import { category } from "../category";

const Main = () => {
  const [data, setData] = useState(products.products);
  const [cart, setCart] = useState([]);
  const [input, setInput] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("Главное");
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cart));
  }, [cart]);

  const categoryClick = (text) => {
    console.log("category", text);
    const newp = products.products.filter((elem) => elem.category === text);
    setData([...newp]);
    setCategoryTitle(text);
    setCategoryCount(newp.length);
  };

  console.log(data);

  const addToCart = (id) => {
    const newp = products.products.find((elem) => elem.id === id);
    setCart([...cart, newp]);
    if (newp) {
      alert("Product added successfully");
    }
  };

  const deleteToCart = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const searchClick = () => {
    const searchData = products.products.filter(
      (elem) => elem.title.toLowerCase().includes(input.toLowerCase())
    );
    setData(searchData);
  };
  

  return (
    <div>
      <Header
        category={category}
        categoryClick={categoryClick}
        input={input}
        setInput={setInput}
        searchClick={searchClick}
      />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                title={
                  categoryCount === 0
                    ? categoryTitle
                    : `${categoryTitle} (${categoryCount})`
                }
                data={data}
                addToCart={addToCart}
                input={input}
                setInput={setInput}
                searchClick={searchClick}
              />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} deleteToCart={deleteToCart} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default Main;