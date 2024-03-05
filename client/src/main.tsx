import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/main.scss";
import { ImageSearchApp } from "./components/ImageSearchApp";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fqkc34njtkd6j3qx.eu.auth0.com"
      clientId="11NsPE7dkY3AWGS0e6ehdeI6mjYPmYdu"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ImageSearchApp />
    </Auth0Provider>
  </React.StrictMode>
);
