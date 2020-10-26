import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext"
import Table from "../table/table.js";
import "../plans/style.css";

const Drones = () => {
    const [globalState] = useContext(GlobalStateContext)

    const getDronesContent = () => {
        return globalState.drones.map(drone => {
            return {
                id: drone.id,
                autonomy: drone.autonomy,
                x: drone.x,
                y: drone.y
            }
        })
    }

    return (
        <section className="section">
            <h2>DRONES</h2>
            <div className="section__div">
                <Table header={["Drones", "Autonomy", "X", "Y"]} content={getDronesContent()} />
            </div>
        </section>
    )
}

export default Drones;