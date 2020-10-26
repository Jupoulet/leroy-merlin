import React, { useState, useContext } from "react";
import "./style.css";
import { GlobalStateContext } from "../context/GlobalStateContext"
import { getNearestStore, getStoresWithObjectInStock, getBestDrone } from "../../controllers/tools";

const Modal = ({ setShow }) => {
  const [globalState, setGlobalState] = useContext(GlobalStateContext)
  const [selectedDrone, setSelectedDrone] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedOrder, setSelectedOrder] = useState("")
  const [selectedObject, setSelectedObject] = useState("")
  const [selectedStore, setSelectedStore] = useState("")

  const handleChange = (e, type) => {
    if (type === "client") {
      setSelectedClient(globalState.clients.find(client => client.id === e.target.value) || { id: "" })
      if (e.target.value === "") {
        setSelectedOrder({ id: "" })
      }
    }

    if (type === "order") {
      setSelectedOrder(globalState.orders.find(order => order.id === e.target.value) || { id: "" })
      if (e.target.value === "") setSelectedObject("")
    }

    if (type === "object") {
      setSelectedObject(e.target.value)
    }

  }


  const generateOptionsClient = () => {
    return [
        ...globalState.clients.map((client) => {
          return (
            <option key={client.id} value={client.id}>{client.id}</option>
          )
        }),
        <option key="empty" value="" selected></option>
    ]
  }

  const generateOptionsOrders = () => {

    return [
      ...globalState.orders.filter(order => order.customerId === selectedClient.id).map((order) => {
        return (
          <option key={order.id} value={order.id}>{order.id}</option>
        )
      }),
      <option selected key="empty" value=""></option>
    ]
  }

  const generateOptionsObject = () => {
    return [
      ...selectedOrder.basket.map((object) => {
        return (
          <option key={object.productId} value={object.productId}>{object.productId}</option>
        )
      }),
      <option selected key="empty" value=""></option>
    ]
  }

  const handleSubmit = ({ bestDrone, bestStore }) => {
    setGlobalState((oldState) => {
      let newPlans = [...oldState.plans, { id: oldState.plans.length + 1, client: selectedClient, order: selectedOrder, object: selectedObject, drone: bestDrone.drone, distance: bestDrone.allDistanceToTravel, store: bestStore }]
      let newDrones = oldState.drones.map((drone) => {
        if(drone.id !== bestDrone.drone.id) return drone;
        return {
          ...drone,
          autonomy: drone.autonomy - bestDrone.allDistanceToTravel,
          x: bestStore.x,
          y: bestStore.y
        }
      })
      let newStores = oldState.stores.map((store) => {
        if (store.id !== bestStore.id) return store;
        return {
          ...store,
          stock: store.stock.map((object) => {
            if (object.productId !== selectedObject) return object;
            return {
              ...object,
              quantity: object.quantity - 1
            }
          })
        }
      })

      return {
        ...oldState,
        plans: newPlans,
        drones: newDrones,
        stores: newStores
      }
    })

    setShow(false)
  }

  const generateBestDrone = () => {
    let bestStore = getNearestStore({ stores: getStoresWithObjectInStock({ stores: globalState.stores, object: selectedObject }), client: selectedClient })
    if (!bestStore) {
      return (
        <div>
          <p style={{color:"red"}}>Il n'y a plus de {selectedObject} en stock pour le moment</p>
        </div>
      )
    }
    let bestDrone = getBestDrone({ drones: globalState.drones, store: bestStore, client: selectedClient })

    if (!bestDrone) {
      return (
        <div>
          <p style={{color:"red"}}>Aucun drone n'a assez d'autonomie pour realiser le</p>
        </div>
      )
    }

    return (
      <div>
        <p>Livraison d'un {selectedObject}, du magasin {bestStore.id} via le drone {bestDrone.drone.id} vers le client {selectedClient.id}</p>
        <button className="button" onClick={() => handleSubmit({ bestDrone, bestStore })}>VALIDER</button>
      </div>
    )
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="question_container">
            <label>Selectionnez un client</label>
            <select onChange={(e) => handleChange(e, "client")} value={selectedClient.id}>
              {generateOptionsClient()}
            </select>
          </div>
          {selectedClient.id ?
            <div className="question_container">
              <label>Selectionnez la commande associée</label>
              <select onChange={(e) => handleChange(e, "order")} value={selectedOrder.id}>
                {generateOptionsOrders()}
              </select>
            </div>
          : null}
          {selectedOrder.id ?
            <div className="question_container">
              <label>Selectionnez l'objet a livrer</label>
              <select onChange={(e) => handleChange(e, "object")} value={selectedObject.id}>
                {generateOptionsObject()}
              </select>
            </div>
          : null}
          {selectedObject ?
            <div>{generateBestDrone()}</div>
          : null}
        </form>
      </div>
    </div>
  )
}

export default Modal;
