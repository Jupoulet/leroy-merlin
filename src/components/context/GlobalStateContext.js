import React, { useState, createContext, useEffect } from "react";
import orders from "../../config/orders.json"
import clients from "../../config/clients.json"
import drones from "../../config/drones.json"
import stores from "../../config/stores.json"

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
	const [globalState, setGlobalState] = useState({
        orders,
        clients,
        drones,
        stores,
        plans: []
    })

	return (
		<GlobalStateContext.Provider value={[globalState, setGlobalState]}>
			{children}
		</GlobalStateContext.Provider>
	);
};