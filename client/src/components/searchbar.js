import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountrie } from "../redux/actions";
import style from "../css/SearchBar.module.css"


export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getNameCountrie(name))
}
    return (

        <div>
            <input className={style.input}
               type = "text"
               placeholder="¿Que pais buscas?"
               onChange={(e) => handleInputChange(e)}
               />
            <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}> Search </button>

            
        </div>
    )
}