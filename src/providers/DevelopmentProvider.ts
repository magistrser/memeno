import { Users } from '../routes/engine/users';
import { Memes } from '../routes/engine/memes';
import { Dev } from '../routes/engine/dev';
import { axiosExtractResult } from './utils';

const UsersEngine = class {
    static createNewUser(
        req: Users.CreateNewUser.Req
    ): Promise<Users.CreateNewUser.Res> {
        return axiosExtractResult<
            Users.CreateNewUser.Req,
            Users.CreateNewUser.Res
        >(Users.CreateNewUser.Rout, Users.CreateNewUser.Type, req);
    }
    static getUser(req: Users.GetUser.Req): Promise<Users.GetUser.Res> {
        return axiosExtractResult<Users.GetUser.Req, Users.GetUser.Res>(
            Users.GetUser.Rout,
            Users.GetUser.Type,
            req
        );
    }
    static rateTags(req: Users.RateTags.Req): Promise<Users.RateTags.Res> {
        return axiosExtractResult<Users.RateTags.Req, Users.RateTags.Res>(
            Users.RateTags.Rout,
            Users.RateTags.Type,
            req
        );
    }
    static removeUser(
        req: Users.RemoveUser.Req
    ): Promise<Users.RemoveUser.Res> {
        return axiosExtractResult<Users.RemoveUser.Req, Users.RemoveUser.Res>(
            Users.RemoveUser.Rout,
            Users.RemoveUser.Type,
            req
        );
    }
    static setAccessLevel(
        req: Users.SetAccessLevel.Req
    ): Promise<Users.SetAccessLevel.Res> {
        return axiosExtractResult<
            Users.SetAccessLevel.Req,
            Users.SetAccessLevel.Res
        >(Users.SetAccessLevel.Rout, Users.SetAccessLevel.Type, req);
    }
    static getAccessLevel(
        req: Users.GetAccessLevel.Req
    ): Promise<Users.GetAccessLevel.Res> {
        return axiosExtractResult<
            Users.GetAccessLevel.Req,
            Users.GetAccessLevel.Res
        >(Users.GetAccessLevel.Rout, Users.GetAccessLevel.Type, req);
    }
};

const MemesEngine = class {
    static addMem(req: Memes.AddMem.Req): Promise<Memes.AddMem.Res> {
        return axiosExtractResult<Memes.AddMem.Req, Memes.AddMem.Res>(
            Memes.AddMem.Rout,
            Memes.AddMem.Type,
            req
        );
    }
    static removeMem(req: Memes.RemoveMem.Req): Promise<Memes.RemoveMem.Res> {
        return axiosExtractResult<Memes.RemoveMem.Req, Memes.RemoveMem.Res>(
            Memes.RemoveMem.Rout,
            Memes.RemoveMem.Type,
            req
        );
    }
    static rateMem(req: Memes.RateMem.Req): Promise<Memes.RateMem.Res> {
        return axiosExtractResult<Memes.RateMem.Req, Memes.RateMem.Res>(
            Memes.RateMem.Rout,
            Memes.RateMem.Type,
            req
        );
    }
};

const DevEngine = class {
    static dropUserWatchedMemes(
        req: Dev.DropUserWatchedMemes.Req
    ): Promise<Dev.DropUserWatchedMemes.Res> {
        return axiosExtractResult<
            Dev.DropUserWatchedMemes.Req,
            Dev.DropUserWatchedMemes.Res
        >(Dev.DropUserWatchedMemes.Rout, Dev.DropUserWatchedMemes.Type, req);
    }
    static setUserUserRating(
        req: Dev.SetUserUserRating.Req
    ): Promise<Dev.SetUserUserRating.Res> {
        return axiosExtractResult<
            Dev.SetUserUserRating.Req,
            Dev.SetUserUserRating.Res
        >(Dev.SetUserUserRating.Rout, Dev.SetUserUserRating.Type, req);
    }
    static dropUserUsersRating(
        req: Dev.DropUserUsersRating.Req
    ): Promise<Dev.DropUserUsersRating.Res> {
        return axiosExtractResult<
            Dev.DropUserUsersRating.Req,
            Dev.DropUserUsersRating.Res
        >(Dev.DropUserUsersRating.Rout, Dev.DropUserUsersRating.Type, req);
    }
    static setUserTagRating(
        req: Dev.SetUserTagRating.Req
    ): Promise<Dev.SetUserTagRating.Res> {
        return axiosExtractResult<
            Dev.SetUserTagRating.Req,
            Dev.SetUserTagRating.Res
        >(Dev.SetUserTagRating.Rout, Dev.SetUserTagRating.Type, req);
    }
    static dropUserTagsRating(
        req: Dev.DropUserTagsRating.Req
    ): Promise<Dev.DropUserTagsRating.Res> {
        return axiosExtractResult<
            Dev.DropUserTagsRating.Req,
            Dev.DropUserTagsRating.Res
        >(Dev.DropUserTagsRating.Rout, Dev.DropUserTagsRating.Type, req);
    }
    static setMemRating(
        req: Dev.SetMemRating.Req
    ): Promise<Dev.SetMemRating.Res> {
        return axiosExtractResult<Dev.SetMemRating.Req, Dev.SetMemRating.Res>(
            Dev.SetMemRating.Rout,
            Dev.SetMemRating.Type,
            req
        );
    }
    static setUserRating(
        req: Dev.SetUserRating.Req
    ): Promise<Dev.SetUserRating.Res> {
        return axiosExtractResult<Dev.SetUserRating.Req, Dev.SetUserRating.Res>(
            Dev.SetUserRating.Rout,
            Dev.SetUserRating.Type,
            req
        );
    }
    static getMyId(): Promise<Dev.GetMyId.Res> {
        return axiosExtractResult<Dev.GetMyId.Req, Dev.GetMyId.Res>(
            Dev.GetMyId.Rout,
            Dev.GetMyId.Type
        );
    }
    static cleanDb(): Promise<Dev.CleanDb.Res> {
        return axiosExtractResult<Dev.CleanDb.Req, Dev.CleanDb.Res>(
            Dev.CleanDb.Rout,
            Dev.CleanDb.Type
        );
    }
};

const DevelopmentProvider = {
    users: UsersEngine,
    memes: MemesEngine,
    dev: DevEngine,
};

export default DevelopmentProvider;
