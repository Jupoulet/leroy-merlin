import React from "react";
import "./style.css";
import Navbar from "./components/navbar/navbar.js";
import Plans from "./components/plans/plans.js";
import { getStoresWithObjectInStock } from './controllers/tools'


export default function App() {
  return (
    <>
      <Navbar />
      <div className="wrapper two_cols">
        <Plans />
        <div>
        </div>
      </div>
    </>
  );
}
