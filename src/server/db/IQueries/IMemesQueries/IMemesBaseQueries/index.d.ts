import { Mem, MemId } from './Mem';

export type AddNewMem = {
    mem_data: Buffer;
    user_id: user_id;
};
export type UpdateMemRating = {
    mem_id: MemId;
    like: number;
};
export type GetMem = {
    mem_id: MemId;
};
export type RemoveMem = GetMem;

export default interface IMemesBaseQueries {
    addMem: (req: AddNewMem) => Promise<MemId>;
    updateMemRating: (req: UpdateMemRating) => Promise<null>;
    getMem: (req: GetMem) => Promise<Mem | null>;
    removeMem: (req: RemoveMem) => Promise<null>;
    removeFromUsersMemes: (req: RemoveMem) => Promise<null>;
    removeFromUsersWatchedMemes: (req: RemoveMem) => Promise<null>;
}
