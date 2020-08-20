import { MemClient } from '../../../../routes/MemClient';

export const INIT_MEMES_ACTION = 'init-memes';
export type InitMemesPayload = {
    currentMem: MemClient;
    prevMem: MemClient;
};
export type InitMemesAction = {
    type: typeof INIT_MEMES_ACTION;
    payload: InitMemesPayload;
};
export const initMemes = (payload: InitMemesPayload) => {
    return { type: INIT_MEMES_ACTION, payload };
};
