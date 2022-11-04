import Menu from "./components/Menu.jsx";
import Delivery from "./components/Delivery.jsx";
import Cart from "./components/Cart.jsx";
import { Route, Routes } from "react-router-dom";

import "./App.css";

export default function Home() {
  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: "url(/fast-food.png)",
        }}
      >
        <header>
          <Menu className="menu" />
          <div className="title">Füber Eats</div>
          <Cart className="cart" />
        </header>

        <Delivery />
        <Routes>
          {/* <Route path="/" element={<Delivery />} /> */}
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
      </div>
    </>
  );
}
