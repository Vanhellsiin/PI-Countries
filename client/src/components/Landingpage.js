import React from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css"

const divStyle = {
  textDecoration: "none",
  };

export default function LandingPage () {
    return (
      <div className= {style.container}>
          <h1 className={style.name} > WELCOME </h1>
          <Link style={divStyle} to = "/home">
             <div className={style.div} > <button className={style.button} > Start </button></div>
          </Link>
      </div>
    )
}