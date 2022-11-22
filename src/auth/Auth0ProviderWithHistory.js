import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_AUTH0_DOMAIN_PROD
      : process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_AUTH0_CLIENT_ID_PROD
      : process.env.REACT_APP_AUTH0_CLIENT_ID;

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate("/leaderboard");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
