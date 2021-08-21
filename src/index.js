import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Authprovider } from "./contexts/auth-context";
import { Wishlistprovider } from "./contexts/wishlist-context";
import { Cartprovider } from "./contexts/cart-context";
import { FormProvider } from "./contexts/form-context";
import { Productprovider } from "./contexts/product-context";

ReactDOM.render(
  <React.StrictMode>
    <Authprovider>
      <FormProvider>
        <Productprovider>
          <Router>
            <Wishlistprovider>
              <Cartprovider>
                <App />
              </Cartprovider>
            </Wishlistprovider>
          </Router>
        </Productprovider>
      </FormProvider>
    </Authprovider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
