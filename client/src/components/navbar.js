import React from "react"
import { Link } from 'react-router-dom';
import SearchBar from "../components/searchbar";
import style from "../css/NavBAR.module.css";




export default function NavBar() { 

    return (
        <nav className={style.nav} >
            <div className= {style.container}>   
                <Link to= "/activity"><button className={style.button} >Crear actividad turistica</button> </Link>
                <SearchBar/>
            </div>
               
                
            
        </nav>
    )
}