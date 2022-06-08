import React from "react";
import style from "../css/Paginado.module.css";


export default function PaginadoPi ({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++) {     //divido todos los paises  por los paises por pagina,y redondeo el resultado.
        pageNumbers.push(i)                                        
    }   

    return (

        <nav>
            <ul className={style.order} >
                { pageNumbers &&
                pageNumbers.map(number =>( 

                    <li className="number" key={number}>
                    <a onClick={() => paginado(number)}> {number} </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

// termino renderizando y mapeando el arreglo, solicitando que me devuelva cada numero del paginado