import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import HeaderNav from "./shared/components/HeaderNav";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <Router />
          </div>
        </>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
