import { SAVE_TOURNAMENT } from "../actions/tournois";

const initialState = {
    tournoi: []
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_TOURNAMENT:
            return {
                tournoi: action.data
            }

        default:
            return state
    }
};

export default reducer;