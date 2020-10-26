import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext"
import Table from "../table/table";
import "../plans/style.css"


const Orders = () => {
    const [globalState] = useContext(GlobalStateContext)

    const formatObjects = (basket) => {
        let stringToReturn = "";
        basket.map((object) => {
            stringToReturn = `${stringToReturn} ${object.productId} x${object.quantity}`
        })
        return stringToReturn;
    }
    return (
        <section className="section">
            <h2>ORDERS</h2>
            <div className="section__div">
                <Table header={["Id", "Client", "Objets"]} content={globalState.orders.map(order => ({ id: order.id, client: order.customerId, objects: formatObjects(order.basket)  }))} />
            </div>
        </section>
    )
}

export default Orders;