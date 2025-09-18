import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./App";
import { CartProvider } from "./components/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <MainPage />
    </CartProvider>
  </React.StrictMode>
);
