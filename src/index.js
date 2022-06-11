import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Authprovider } from "./contexts/Authcontext";
import { Cartprovider } from "./contexts/Cartcontext";
import { Productprovider } from "./contexts/Prodcontext";
import { Wishlistprovider } from "./contexts/Wishlistcontext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Authprovider>
      <Cartprovider>
        <Wishlistprovider>
          <Productprovider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Productprovider>
        </Wishlistprovider>
      </Cartprovider>
    </Authprovider>
  </StrictMode>,
  rootElement
);
