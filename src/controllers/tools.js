const getStoresWithObjectInStock = ({ stores, object } = { }) => {
    if (!stores || !object) throw new Error("Missing required arguments")
    if (!Array.isArray(stores) || typeof object !== "string") throw new Error("Arguments not valid")

    return stores.filter((store) => {
        if (!store.stock) return false;
        return store.stock.some(product => product.productId === object && product.quantity > 0)
    })
}

const getNearestStore = ({ stores, client } = { }) => {
    if(!stores || !client) throw new Error("Missing required arguments")
    if(typeof client !== "object" || !Array.isArray(stores)) throw new Error("Arguments not valid")

    return stores.reduce((nearest, store) => {
        let distanceStoreToClient = calculateDistance({ x1: store.x, y1: store.y, x2: client.x, y2: client.y })

        if (nearest === null) return store;
        let actualNearestDistance = calculateDistance({ x1: nearest.x, y1: nearest.y, x2: client.x, y2: client.y })

        return distanceStoreToClient < actualNearestDistance ? store : nearest

    }, null)

}

const getBestDrone = ({ drones, store, client } = { }) => {
    if (!drones || !store || !client) throw new Error("Missing required arguments")
    if (!Array.isArray(drones) || typeof store !== "object" || typeof client !== "object") throw new Error("Arguments not valid")

    return drones.reduce((winnerDrone, drone) => {
        let distanceDroneToStore = calculateDistance({ x1: drone.x, x2: store.x, y1: drone.y, y2: store.y });
        let distanceStoreToClient = calculateDistance({ x1: store.x, x2: client.x, y1: store.y, y2: client.y });
        let allDistanceToTravel = distanceDroneToStore + (distanceStoreToClient * 2)
        if (!winnerDrone && allDistanceToTravel <= drone.autonomy) return { drone, allDistanceToTravel }
        if (allDistanceToTravel <= drone.autonomy && allDistanceToTravel < winnerDrone.allDistanceToTravel) return { drone, allDistanceToTravel }

        return winnerDrone;
    }, null)

}

const calculateDistance = ({ x1, y1, x2, y2 } = { }) => {
    if(!x1 || !y1 || !x2 || !y2) throw new Error("Missing required arguments")
    if ([x1, y1, x2, y2].filter(n => typeof n === "number").length !== 4) throw new Error("All arguments must be numbers")

    return Math.hypot(x2 -x1, y2 - y1).toFixed(2) / 1
}

module.exports ={
    getStoresWithObjectInStock,
    getNearestStore,
    calculateDistance,
    getBestDrone
}