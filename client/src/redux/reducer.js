const initialState = {
    countries : [],
    allCountries: [],
    continents: [],
    detail: [],
    activities: [],
}




function filterByName (countries, payload) {
    let order = countries
        const orderName = payload === "asc" ?
         order.sort(function(a, b){
            if (a.name > b.name) {
                return 1
               }
            if (b.name > a.name) {
                 return -1
                }
                return 0

        }) :
         order.sort(function(a, b){
            if (a.name > b.name) {
                return -1
               }
            if (b.name > a.name) {
                 return 1
                }
                return 0
        })
       return orderName
}

function filterByPoblation (countries, payload) {
    let score = countries
            const orderScore = payload === "asc" ?
             score.sort(function(a, b){
                if (a.population > b.population) {
                    return -1
                   }
                if (b.population > a.population) {
                     return 1
                    }
                    return 0
        
            }) :
             score.sort(function(a, b){
                if (a.population > b.population) {
                    return 1
                   }
                if (b.population > a.population) {
                     return -1
                    }
                    return 0
            })
            return orderScore
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case "GET_NAME":
            return {
                ...state,
                countries: action.payload
            }

        case "FILTER_BY_NAME":
            const orderName = filterByName(state.countries, action.payload)
          return {
              ...state,
              countries: orderName,
          }

          case "FILTER_BY_POBLATION":
            let score = filterByPoblation(state.countries, action.payload)
              return {
                  ...state,
                  countries: score,
                
              }

              case "GET_CONTINENTS":
                  return {
                      ...state,
                      continents: action.payload,
                  }
                
            case "FILTER_BY_CONTINENT":
                let allContinents = [...state.allCountries]
                
                let continentsFiltered = 
             action.payload.includes("all")
                ? allContinents
                : allContinents.filter((el) => el.continents.includes(action.payload)); 
                console.log(continentsFiltered)

            return {
              ...state,
              countries: continentsFiltered, 
            }

            case "GET_DETAIL":
                return {
                    ...state,
                    detail: action.payload
                }
            
            case "POST_ACTIVITY":
                return {
                    ...state
                }   
            
            case "GET_ACTIVITIES" :
                return {
                    ...state,
                    activities: action.payload
                }   

            case "FILTER_BY_ACTIVITIES" :
                let totalCountries = [...state.allCountries];

                let CountriesFilter = action.payload.includes("all") ? totalCountries : totalCountries.filter((el) => el.activities.map((act) => act.name).includes(action.payload));
                return {
                    ...state,
                    countries: CountriesFilter,

                }
             
            default:
                return state
    }
}

export default rootReducer;