import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import gamesReducer from './store/reducers/games';
import betsReducer from "./store/reducers/bets";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";

const rootReducer = combineReducers({
    games: gamesReducer,
    bets: betsReducer,
  });

const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>
);
