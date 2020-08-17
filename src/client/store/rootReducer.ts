import memesReducer from '../MainPageRouter/Memes/reducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    memes: memesReducer,
})

export default rootReducer;