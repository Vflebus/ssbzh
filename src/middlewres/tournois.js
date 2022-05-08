import { FETCH_TOURNAMENT } from "../actions/tournois";

const tournoisMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case FETCH_TOURNAMENT:
            try {
                console.log('fetch');
            } catch (err) {
                console.error(err);
            }
            next(action);
            break;

        default:
            next(action);
            break;
    }
}

export default tournoisMiddleware;