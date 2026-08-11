import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuctionProvider } from "./context/AuctionContext.jsx";
import { ListingsProvider } from "./context/ListingsContext.jsx";
import { MessagesProvider } from "./context/MessagesContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuctionProvider>
          <ListingsProvider>
            <MessagesProvider>
              <App />
            </MessagesProvider>
          </ListingsProvider>
        </AuctionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
