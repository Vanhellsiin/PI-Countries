import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterByName, filterByPoblation, getActivities, filterByContinent, getContinent, filterByActivities } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./card.js";
import PaginadoPi from "./paginado.js";

import style from "../css/Home.module.css";


const divStyle = {
    textDecoration: "none",
    };
     

export default function Home () {
    const dispatch = useDispatch();
    let allCountries = useSelector((state) => state.countries);
    const [orden, setOrder] = useState("");
    const [orden2, setOrder2] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ countriesPerPage, setCountriesPerPage ] = useState(10);
    const indexOfLastCountrie = currentPage * countriesPerPage;
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie);
    
    const allContinents = useSelector ((state) => state.continents);
    
    const allActivities = useSelector ((state) => state.activities);
     

   

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getContinent());
        dispatch(getActivities());
        dispatch (getCountries());
    }, [])

     

    
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries())
        setCurrentPage(1);
    }

    function handleSortName(e) {
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)

    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(filterByPoblation(e.target.value))
        setCurrentPage(1);
        setOrder2(`Ordenado ${e.target.value}`)

    }
    

    function handleFilterContinent(e){
        e.preventDefault()
         dispatch(filterByContinent(e.target.value))
         setCurrentPage(1)
    }

    
    function handleFilterActivities(e){
        e.preventDefault()
         dispatch(filterByActivities(e.target.value))
         setCurrentPage(1)
    }

    

return (
    <div className={style.container} >
        
        
        <button className={style.select1} onClick={ e => {handleClick(e)}}> Volver a cargar todos los paises</button>
        
    
    <div>
        <select className={style.select1} onChange={(e) => handleSortName(e)}>
        <option value= "all"> - </option>
        <option value= "asc"> A - Z </option>
        <option value= "desc"> Z - A </option>
        </select>

        <select className={style.select1} onChange={(e) => handleSort(e)}>
        <option value= "all"> - </option>
        <option value= "asc"> Higher poblation </option>
        <option value= "desc"> Lower poblation </option>
        </select>

        <select className={style.select1} onChange={(e) => handleFilterContinent(e)}>
        <option value= "all"> Elige tu continente </option>
         {allContinents?.map((c) => 
            <option  value= {c}> {c} </option> )}  
        </select>
            
        <select className={style.select1} onChange={(e) => handleFilterActivities(e)}> 
        <option value="all"> Elige tu actividad </option>
        {allActivities?.map ((e) => 
        <option  value={e} > {e} </option>)}
        </select> 

        

        
    </div>

    <PaginadoPi
    countriesPerPage = {countriesPerPage}
    allCountries = {allCountries.length}
    paginado= {paginado}
    />
      
      
     <div className={style.cards} >
      { currentCountries.map ((c) => 
          
          (<div >
            <Link style={divStyle} to= {"/countries/" + c.id} >
              <Card 
                flags = {c.flags}
                name = {c.name}
                continents = {c.continents}
                key = {c.id}
                id = {c.id}
               />
            </Link>
          </div>) 
            
           )
      }

      </div>


    </div>
   )
}





// https://client-demo12.vercel.app/
