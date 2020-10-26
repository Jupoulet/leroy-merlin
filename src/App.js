import React from "react";
import "./style.css";
import Navbar from "./components/navbar/navbar.js";
import Plans from "./components/plans/plans.js";
import Orders from "./components/orders/orders.js";
import Drones from "./components/drones/drones.js";
import Stocks from "./components/stocks/stocks.js";
import { GlobalStateProvider } from "./components/context/GlobalStateContext";


export default function App() {
  return (
    <>
      <Navbar />
      <GlobalStateProvider>
        <div className="wrapper two_cols">
          <Plans />
          <div className="">
            <Orders />
            <div className="two_cols">
              <Stocks />
              <Drones />
            </div>
          </div>
        </div>
      </GlobalStateProvider>
    </>
  );
}
