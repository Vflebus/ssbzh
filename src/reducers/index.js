import { combineReducers } from "redux";

import tournoisReducer from "./tournois"

const rootReducer = combineReducers({
    tournois: tournoisReducer
});

export default rootReducer;