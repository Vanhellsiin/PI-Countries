import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createActivity, getCountries } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../css/Create.module.css"


function validate(input){
    let errors = {}

    if(!/^[a-zA-Z\s]+$/.test(input.name)){
        errors.name = "se requiere un nombre";
    } else {
        errors.name = ""
    }
    if(!input.difficulty) {
        errors.difficulty = "Se requiere un nivel de dificultad";
    } else {
        errors.difficulty = ""
    }
    if(!input.duration){
        errors.duration = "Se requiere un tiempo de duracion";
    } else {
        errors.duration = ""
    }
    if(!input.season){
       errors.season = "Se requiere una estacion del año";
    } else {
        errors.season = ""
    }
    if(input.country.length===0){
        errors.country = "Se requiere minimo un pais";
    } else {
        errors.country = ""
    }

    return errors
}





export default function NewActivity(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const history = useHistory();


    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    useEffect(() => {
         setErrors(validate(input))
         }, [])



    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
        
    })


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
         setErrors(validate({
             ...input,
             [e.target.name] : e.target.value
         }));
         console.log(input)
         console.log(errors)
    }




    function handleSelect(e) {
        setInput({
             ...input,
              country: [...input.country,e.target.value]
        });
        
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }



    function handleDelete(el){
        setInput({
            ...input,
            country: input.country.filter(c => c !== el)
        })
    }



    function handleSubmit(e){
        e.preventDefault()
        dispatch(createActivity(input))
        alert("¡Actividad creada!")
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "", 
            country: [],
        })
         
        history.push("/home")
    }




    return (
        <div className={style.container}>
            
            <h1> ¡Crea una actividad turistica! </h1>
            <Link to= "/home"><button className={style.button}>Volver al home</button></Link>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label className={style.title}>Nombre:</label>
                    <input
                    className={style.input}
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                     {errors.name && (
                        <p className="error"> {errors.name} </p>
                    )} 
                </div>

                <div>
                    <label className={style.title}>Dificultad:</label>
                    <input 
                    className={style.input}
                    type= "number"
                    min="0"
                    max="5"
                    value= {input.difficulty}
                    name= "difficulty"
                    onChange={handleChange}
                    />
                     {errors.difficulty && (
                        <p className="error"> {errors.difficulty} </p>
                    )} 
                </div>

                <div>
                    <label className={style.title}>Duracion:</label>
                    <input
                    className={style.input}
                    type= "text"
                    value= {input.duration}
                    name= "duration"
                    onChange={handleChange}
                    />
                    {errors.duration && (
                        <p className="error"> {errors.duration} </p>
                    )} 
                </div>

                <div>
                    <label className={style.title}>Estacion del año:</label>
                    <input
                    className={style.input}
                    type= "text"
                    value= {input.season}
                    name= "season"
                    onChange={handleChange}
                    />
                     {errors.season && (
                        <p className="error"> {errors.season} </p>
                    )} 
                </div>

                <div>
                    <select className={style.select1} onChange={(e) => handleSelect(e)} name= "country">
                        {allCountries.map((e) => (
                            <option value={e.name}> {e.name} </option>
                        ) )}
                    </select>
                    
                     {errors.country && (
                        <p className="error">{errors.country}</p>
                    )} 
                    <ul>{input.country.map(el => <li onClick={()=> handleDelete(el)}>{el}</li>)}</ul>
                </div>

                {  

                    !errors.name && !errors.difficulty && !errors.duration && !errors.season && !errors.country? 
                    <button className={style.button} type= 'Submit'> Crear actividad turistica </button>
                    : (<p> Todos los campos deben ser completados para poder crear la actividad turistica </p>)


                 }
            </form>
        </div>
    )
}