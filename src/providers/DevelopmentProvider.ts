import axios from 'axios';
import { Users } from '../routes/engine/users';
import { Memes } from '../routes/engine/memes';
import { Dev } from '../routes/engine/dev';

const UsersEngine = class {
    createNewUser(
        req: Users.CreateNewUser.Req
    ): Promise<Users.CreateNewUser.Res> {
        return axios[Users.CreateNewUser.Type](Users.CreateNewUser.Rout);
    }
    getUser(req: Users.GetUser.Req): Promise<Users.GetUser.Res> {
        return axios[Users.GetUser.Type](Users.GetUser.Rout);
    }
    rateTags(req: Users.RateTags.Req): Promise<Users.RateTags.Res> {
        return axios[Users.RateTags.Type](Users.RateTags.Rout);
    }
    removeUser(req: Users.RemoveUser.Req): Promise<Users.RemoveUser.Res> {
        return axios[Users.RemoveUser.Type](Users.RemoveUser.Rout);
    }
    setAccessLevel(
        req: Users.SetAccessLevel.Req
    ): Promise<Users.SetAccessLevel.Res> {
        return axios[Users.SetAccessLevel.Type](Users.SetAccessLevel.Rout);
    }
    getAccessLevel(
        req: Users.GetAccessLevel.Req
    ): Promise<Users.GetAccessLevel.Res> {
        return axios[Users.GetAccessLevel.Type](Users.GetAccessLevel.Rout);
    }
};

const MemesEngine = class {
    addMem(req: Memes.AddMem.Req): Promise<Memes.AddMem.Res> {
        return axios[Memes.AddMem.Type](Memes.AddMem.Rout);
    }
    removeMem(req: Memes.RemoveMem.Req): Promise<Memes.RemoveMem.Res> {
        return axios[Memes.RemoveMem.Type](Memes.RemoveMem.Rout);
    }
    rateMem(req: Memes.RateMem.Req): Promise<Memes.RateMem.Res> {
        return axios[Memes.RateMem.Type](Memes.RateMem.Rout);
    }
};

const DevEngine = class {
    dropUserWatchedMemes(
        req: Dev.DropUserWatchedMemes.Req
    ): Promise<Dev.DropUserWatchedMemes.Res> {
        return axios[Dev.DropUserWatchedMemes.Type](
            Dev.DropUserWatchedMemes.Rout
        );
    }
    setUserUserRating(
        req: Dev.SetUserUserRating.Req
    ): Promise<Dev.SetUserUserRating.Res> {
        return axios[Dev.SetUserUserRating.Type](Dev.SetUserUserRating.Rout);
    }
    dropUserUsersRating(
        req: Dev.DropUserUsersRating.Req
    ): Promise<Dev.DropUserUsersRating.Res> {
        return axios[Dev.DropUserUsersRating.Type](
            Dev.DropUserUsersRating.Rout
        );
    }
    setUserTagRating(
        req: Dev.SetUserTagRating.Req
    ): Promise<Dev.SetUserTagRating.Res> {
        return axios[Dev.SetUserTagRating.Type](Dev.SetUserTagRating.Rout);
    }
    dropUserTagsRating(
        req: Dev.DropUserTagsRating.Req
    ): Promise<Dev.DropUserTagsRating.Res> {
        return axios[Dev.DropUserTagsRating.Type](Dev.DropUserTagsRating.Rout);
    }
    setMemRating(req: Dev.SetMemRating.Req): Promise<Dev.SetMemRating.Res> {
        return axios[Dev.SetMemRating.Type](Dev.SetMemRating.Rout);
    }
    setUserRating(req: Dev.SetUserRating.Req): Promise<Dev.SetUserRating.Res> {
        return axios[Dev.SetUserRating.Type](Dev.SetUserRating.Rout);
    }
};

const DevelopmentProvider = {
    users: UsersEngine,
    memes: MemesEngine,
    dev: DevEngine,
};

export default DevelopmentProvider;
