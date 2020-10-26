const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { getStoresWithObjectInStock, getNearestStore, calculateDistance, getBestDrone } = require("../src/controllers/tools")

describe("getStoresWithObjectInStock", () => {
  it("Throw if arguments are not provided", () => {
    assert.throw(() => getStoresWithObjectInStock(), Error, "Missing required arguments")
    assert.throw(() => getStoresWithObjectInStock({ stores: [] }), Error, "Missing required arguments")
    assert.throw(() => getStoresWithObjectInStock({ object: "Hammer" }), Error, "Missing required arguments")
  });

  it("Throw if stores are not Array or object are not String", () => {
    assert.throw(() => getStoresWithObjectInStock({ stores: "stores", object: "Hammer"}), Error, "Arguments not valid")
    assert.throw(() => getStoresWithObjectInStock({ stores: [], object: {}}), Error, "Arguments not valid")
  })

  it("Return empty array when stock is not defined in store object", () => {
    let stores = [{ id: "Paris" }, { id: "Lille" }];
    let result = getStoresWithObjectInStock({ stores, object: "Hammer" })
    expect(Array.isArray(result)).to.equal(true)
    expect(result.length).to.equal(0)

  })

  it("Return array of stores who has given object in stock", () => {
    let stores = [
      {
        id: "Paris",
        stock: [
          { productId: "Axe", quantity: 10 },
          { productId: "Hammer", quantity: 1 }
        ]
      },
      {
        id: "Alfortville",
        stock: [
          { productId: "Axe", quantity: 0 },
          { productId: "Hammer", quantity: 1 }
        ]
      }
    ]

    let result = getStoresWithObjectInStock({ stores, object: "Axe"})
    expect(result.length).to.equal(1)
    expect(result[0].id).to.equal("Paris")

    let result2 = getStoresWithObjectInStock({ stores, object: "Nail" })
    expect(result2.length).to.equal(0)

    let result3 = getStoresWithObjectInStock({ stores, object: "Hammer" })
    expect(result3.length).to.equal(2);

  })
});

describe("getNearestStore", () => {
  it("Throw if argument are not provided", () => {
    assert.throw(() => getNearestStore(), Error, "Missing required arguments")
    assert.throw(() => getNearestStore({ stores: [] }), Error, "Missing required arguments")
    assert.throw(() => getNearestStore({ client: {} }), Error, "Missing required arguments")
  })

  it("Throw if stores are not Array or client is not Object", () => {
    assert.throw(() => getNearestStore({ client: "Henri", stores: [] }), Error, "Arguments not valid")
    assert.throw(() => getNearestStore({ stores: "stores", client: {} }), Error, "Arguments not valid")
  })

  it("Return the nearest store", () => {
    const stores = [{ id: "Paris", x: 55, y: 55 }, { id: "Villeneuve", x: 5, y: 5 }, { id: "Alfortville", x: 17, y: 17 }]
    const client1 = { id: "Fernand", x: 50, y: 50 }
    const client2 = { id: "Olivier", x: 10, y: 10 }

    let result = getNearestStore({ stores, client: client1 })
    expect(result.id).to.equal("Paris")

    let result2 = getNearestStore({ stores, client: client2 })
    expect(result2.id).to.equal("Villeneuve")
  })

})

describe("getBestDrone", () => {
  it("Throw error if one of the arguments not provided", () => {
    assert.throw(() => getBestDrone(), Error, "Missing required arguments")
    assert.throw(() => getBestDrone({ drones: [], store: {} }), Error, "Missing required arguments")
  })

  it("Throw an error if one of the arguments are not valid", () => {
    assert.throw(() => getBestDrone({ drones: {}, store: {}, client: {} }), Error, "Arguments not valid")
    assert.throw(() => getBestDrone({ drones: [], store: "Paris",  client: {} }), Error, "Arguments not valid")
  })

  it("Return the best drone among the drones availables", () => {
    let drones = [{ id: "Alpha", x: 5, y: 10, autonomy: 0 }, { id: "Beta", x: 2, y: 20, autonomy: 28 }, { id: "Gamma", x: 5, y: 10, autonomy: 100 }]
    let store = { id: "Villeneuve", x: 3, y: 3 }
    let client = { id: "Jean", x: 5, y: 8 }
    let client2 = { id: "Marc", x: 3, y: 17 }
    let bestDrone = getBestDrone({ store, drones, client })
    let bestDrone2 = getBestDrone( { store, client: client2, drones })
    expect(bestDrone.drone.id).to.equal("Gamma")
    expect(bestDrone2.drone.id).to.equal("Gamma")
  })

  it("Return null if no drones are found", () => {
    let drones = [{ id: "Alpha", x: 5, y: 10, autonomy: 0 }, { id: "Beta", x: 2, y: 20, autonomy: 28 }, { id: "Gamma", x: 5, y: 10, autonomy: 25 }]
    let store = { id: "Villeneuve", x: 3, y: 3 }
    let client = { id: "Marc", x: 3, y: 17 }

    let noDrone = getBestDrone({ store, drones, client })
    expect(noDrone).to.be.null;
  })
})

describe("calculateDistance", () => {
  it("Throw error if one of the arguments are not provided", () => {
    assert.throw(() => calculateDistance({ x1: 1, y1: 3, x2: null, y2: 8 }), Error, "Missing required arguments")
  })

  it("Throw an error if one of the argument is not a number", () => {
    assert.throw(() => calculateDistance({ x1: 1, y1: 3, x2: "4", y2: 8 }), Error, "All arguments must be numbers")
    assert.doesNotThrow(() => calculateDistance({ x1: 1, y1: 3, x2: 4, y2: 8 }), Error, "All arguments must be numbers")
  })

  it("Return the correct distance", () => {
    let distance = calculateDistance({ x1: 3, y1: 2, x2: 2, y2: 5 })
    expect(distance).to.equal(3.16)
  })
})
