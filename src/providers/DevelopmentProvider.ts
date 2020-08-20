import axios from 'axios';
import { Users } from '../routes/engine/users';
import { Memes } from '../routes/engine/memes';
import { Dev } from '../routes/engine/dev';

const UsersEngine = class {
    static createNewUser(
        req: Users.CreateNewUser.Req
    ): Promise<Users.CreateNewUser.Res> {
        return new Promise<Users.CreateNewUser.Res>((resolve, rej) =>
            axios[Users.CreateNewUser.Type](Users.CreateNewUser.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static getUser(req: Users.GetUser.Req): Promise<Users.GetUser.Res> {
        return new Promise<Users.GetUser.Res>((resolve, rej) =>
            axios[Users.GetUser.Type](Users.GetUser.Rout, { data: req })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static rateTags(req: Users.RateTags.Req): Promise<Users.RateTags.Res> {
        return new Promise<Users.RateTags.Res>((resolve, rej) =>
            axios[Users.RateTags.Type](Users.RateTags.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static removeUser(
        req: Users.RemoveUser.Req
    ): Promise<Users.RemoveUser.Res> {
        return new Promise<Users.RemoveUser.Res>((resolve, rej) =>
            axios[Users.RemoveUser.Type](Users.RemoveUser.Rout, { data: req })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static setAccessLevel(
        req: Users.SetAccessLevel.Req
    ): Promise<Users.SetAccessLevel.Res> {
        return new Promise<Users.SetAccessLevel.Res>((resolve, rej) =>
            axios[Users.SetAccessLevel.Type](Users.SetAccessLevel.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static getAccessLevel(
        req: Users.GetAccessLevel.Req
    ): Promise<Users.GetAccessLevel.Res> {
        return new Promise<Users.GetAccessLevel.Res>((resolve, rej) =>
            axios[Users.GetAccessLevel.Type](Users.GetAccessLevel.Rout, {
                data: req,
            })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
};

const MemesEngine = class {
    static addMem(req: Memes.AddMem.Req): Promise<Memes.AddMem.Res> {
        return new Promise<Memes.AddMem.Res>((resolve, rej) =>
            axios[Memes.AddMem.Type](Memes.AddMem.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static removeMem(req: Memes.RemoveMem.Req): Promise<Memes.RemoveMem.Res> {
        return new Promise<Memes.RemoveMem.Res>((resolve, rej) =>
            axios[Memes.RemoveMem.Type](Memes.RemoveMem.Rout, { data: req })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static rateMem(req: Memes.RateMem.Req): Promise<Memes.RateMem.Res> {
        return new Promise<Memes.RateMem.Res>((resolve, rej) =>
            axios[Memes.RateMem.Type](Memes.RateMem.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
};

const DevEngine = class {
    static dropUserWatchedMemes(
        req: Dev.DropUserWatchedMemes.Req
    ): Promise<Dev.DropUserWatchedMemes.Res> {
        return new Promise<Dev.DropUserWatchedMemes.Res>((resolve, rej) =>
            axios[Dev.DropUserWatchedMemes.Type](
                Dev.DropUserWatchedMemes.Rout,
                req
            )
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static setUserUserRating(
        req: Dev.SetUserUserRating.Req
    ): Promise<Dev.SetUserUserRating.Res> {
        return new Promise<Dev.SetUserUserRating.Res>((resolve, rej) =>
            axios[Dev.SetUserUserRating.Type](Dev.SetUserUserRating.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static dropUserUsersRating(
        req: Dev.DropUserUsersRating.Req
    ): Promise<Dev.DropUserUsersRating.Res> {
        return new Promise<Dev.DropUserUsersRating.Res>((resolve, rej) =>
            axios[Dev.DropUserUsersRating.Type](
                Dev.DropUserUsersRating.Rout,
                req
            )
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static setUserTagRating(
        req: Dev.SetUserTagRating.Req
    ): Promise<Dev.SetUserTagRating.Res> {
        return new Promise<Dev.SetUserTagRating.Res>((resolve, rej) =>
            axios[Dev.SetUserTagRating.Type](Dev.SetUserTagRating.Rout, {
                data: req,
            })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static dropUserTagsRating(
        req: Dev.DropUserTagsRating.Req
    ): Promise<Dev.DropUserTagsRating.Res> {
        return new Promise<Dev.DropUserTagsRating.Res>((resolve, rej) =>
            axios[Dev.DropUserTagsRating.Type](Dev.DropUserTagsRating.Rout, req)
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static setMemRating(
        req: Dev.SetMemRating.Req
    ): Promise<Dev.SetMemRating.Res> {
        return new Promise<Dev.SetMemRating.Res>((resolve, rej) =>
            axios[Dev.SetMemRating.Type](Dev.SetMemRating.Rout, { data: req })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
    static setUserRating(
        req: Dev.SetUserRating.Req
    ): Promise<Dev.SetUserRating.Res> {
        return new Promise<Dev.SetUserRating.Res>((resolve, rej) =>
            axios[Dev.SetUserRating.Type](Dev.SetUserRating.Rout, { data: req })
                .then((res) => resolve(res.data))
                .catch((err) => rej(err))
        );
    }
};

const DevelopmentProvider = {
    users: UsersEngine,
    memes: MemesEngine,
    dev: DevEngine,
};

export default DevelopmentProvider;
