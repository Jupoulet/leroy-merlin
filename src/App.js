import React from "react";
import "./style.css";
import Navbar from "./components/navbar";


export default function App() {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1>Hello StackBlitz!</h1>
        <p>Start to some magic happen :)</p>
      </div>
    </>
  );
}
