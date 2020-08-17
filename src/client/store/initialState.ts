import { initState as memesInitialState } from '../pages/Memes/reducer';

const initialState = {
    memes: memesInitialState,
};

export type GlobalState = typeof initialState;
export default initialState;
