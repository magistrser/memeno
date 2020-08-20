import {
    DropUserTagsRating,
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetMemRating,
    SetUserRating,
    SetUserTagRating,
    SetUserUserRating,
} from '../../db/IQueries/IDevQueries/IDevBaseQueries';

interface IDevEngine {
    dropUserWatchedMemes(req: DropUserWatchedMemes): Promise<null>;
    setUserUserRating(req: SetUserUserRating): Promise<void>;
    dropUserUsersRating(req: DropUserUsersRating): Promise<void>;
    setUserTagRating(req: SetUserTagRating): Promise<void>;
    dropUserTagsRating(req: DropUserTagsRating): Promise<void>;
    setMemRating(req: SetMemRating): Promise<void>;
    setUserRating(req: SetUserRating): Promise<void>;
}

export default IDevEngine;
