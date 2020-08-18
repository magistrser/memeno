import {
    DropUserUsersRating,
    DropUserWatchedMemes,
    SetUserUserRating,
    SetUserTagRating,
    DropUserTagsRating,
    SetMemRating,
    SetUserRating,
} from '../../../server/db/IQueries/IDevQueries/IDevBaseQueries';

export type DropUserWatchedMemesReq = DropUserWatchedMemes;
export type SetUserUserRatingReq = SetUserUserRating;
export type DropUserUsersRatingReq = DropUserUsersRating;
export type SetUserTagRatingReq = SetUserTagRating;
export type DropUserTagsRatingReq = DropUserTagsRating;
export type SetMemRatingReq = SetMemRating;
export type SetUserRatingReq = SetUserRating;
