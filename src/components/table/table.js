import React from "react";
import "./style.css";

const Table = ({ header, content }) => {
    const generateHeading = () => {
        return header.map((title) => {
            return (
                <th key={title} className="th">{title}</th>
            )
        })
    }

    const generateContent = () => {
        return content.map((line) => {
            return (
                <tr key={line.id}>
                    {Object.values(line).map((value, index) => <td className="td" key={index}>{value}</td>)}
                </tr>
            )
        })
    }
    return (
        <table>
            <thead>
                <tr>
                    {generateHeading()}
                </tr>
            </thead>
            <tbody>
                {generateContent()}
            </tbody>
        </table>
    )
}

export default Table;