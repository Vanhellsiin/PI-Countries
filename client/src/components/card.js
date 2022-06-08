import React from "react";
import style from "../css/Card.module.css"


export default function Card ({flags, name, continents}) {
    return (
        <div className={style.container} >
        <div className= {style.card}>
        <img src = {flags} witdh="200px" height="200px" />
        <h2>{name}</h2>
        <h3> Continent: {continents}</h3>
        </div>
        </div>
    )
}