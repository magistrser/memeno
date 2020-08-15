import { IDatabase } from 'pg-promise';
import { IExtensions } from '../../index';
import IMemesBaseQueries, {
    AddNewMem,
    GetMem,
    RemoveMem,
    UpdateMemRating,
} from '../../../IQueries/IMemesQueries/IMemesBaseQueries';
import {
    Mem,
    MemId,
} from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';

export default class MemesBaseQueries implements IMemesBaseQueries {
    constructor(private db: IDatabase<IExtensions>) {}

    addMem(req: AddNewMem): Promise<MemId> {
        return new Promise((res, reg) => res(0));
    }
    updateMemRating(req: UpdateMemRating): Promise<void> {
        return new Promise((res, reg) => res());
    }
    getMem(req: GetMem): Promise<Mem> {
        return new Promise((res, reg) => res());
    }
    removeMem(req: RemoveMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeFromUsersMemes(req: RemoveMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
    removeFromUsersMemesRating(req: RemoveMem): Promise<void> {
        return new Promise((res, reg) => res());
    }
}
