import { createstore, appplyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  thunk  from "redux-thunk";
import rootReducer from "../reducer";

export const store = createstore(
    rootReducer,
    composeWithDevTools(appplyMiddleware(thunk))
)