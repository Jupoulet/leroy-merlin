import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext"
import Table from "../table/table.js";
import "../plans/style.css";

const Stocks = () => {
    const [globalState] = useContext(GlobalStateContext)

    const getStocksHeader = () => {
        return [
            "Objects",
            ...globalState.stores.map((store) => {
                return store.id
            })
        ]
    }

    const getContentStocks = () => {
        let arrOfTypeObjects = globalState.stores.reduce((total, store) => {
            for (let obj of store.stock) {
                if (!total.includes(obj.productId)) total.push(obj.productId)
            }
            return total
        }, [])

        let contentToReturn = []

        arrOfTypeObjects.map(type => {
            let resume = { object: type };
            for (let store of globalState.stores) {
                resume[store.id] = 0;
                for (let stock of store.stock) {
                    if (stock.productId !== type) continue;
                    resume[store.id] = stock.quantity
                }
            }
            contentToReturn.push(resume)
        })

        return contentToReturn
    }

    return (
        <section className="section">
            <h2>STOCKS</h2>
            <div className="section__div">
                <Table header={getStocksHeader()} content={getContentStocks()} />
            </div>
        </section>
    )

}

export default Stocks;