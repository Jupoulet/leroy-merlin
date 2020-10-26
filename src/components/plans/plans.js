import React, { useState, useContext } from "react";
import "./style.css";
import Modal from "../modal/modal";
import { GlobalStateContext } from "../context/GlobalStateContext"
import Table from "../table/table.js";


const Plans = () => {
  const [showModal, setShowModal] = useState(false);
  const [globalState] = useContext(GlobalStateContext)
  return (
    <>
      {showModal ? <Modal setShow={setShowModal} />: null}
      <section className="section">
        <h2>PLANS</h2>
        <div className="section__div">
          <button className="button" onClick={() => setShowModal(true)}>Ajouter</button>
          <Table header={["Id", "Drone", "Store", "Object", "Client"]} content={globalState.plans.map(plan => ({ id: plan.id, drone: plan.drone.id, store: plan.store.id, object: plan.object, client: plan.client.id  }))} />
        </div>
      </section>
    </>
  );
};

export default Plans;
