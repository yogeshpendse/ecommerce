import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./context-used/cart-context";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </StrictMode>,
  rootElement
);
