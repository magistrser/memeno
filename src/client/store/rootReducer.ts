import memesReducer from '../pages/Memes/reducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    memes: memesReducer,
})

export default rootReducer;