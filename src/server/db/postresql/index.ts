import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise';
import IUsersBaseQueries from '../IQueries/IUsersQueries/IUsersBaseQueries';
import UsersBaseQueries from './queris/UsersQueries/UsersBaseQueries';
import { IUsersMemesQueries } from '../IQueries/IUsersQueries/IUsersMemesQueries';
import { IUsersTagsRatingQueries } from '../IQueries/IUsersQueries/IUsersTagsRatingQueries';
import { IUsersUsersRatingQueries } from '../IQueries/IUsersQueries/IUsersUsersRatingQueries';
import { IUsersWatchedMemesQueries } from '../IQueries/IUsersQueries/IUsersWatchedMemesQueries';
import { IVkUsersQueries } from '../IQueries/IUsersQueries/IVkUsersQueries';
import UsersMemesQueries from './queris/UsersQueries/UsersMemesQueries';
import UsersTagsRatingQueries from './queris/UsersQueries/UsersTagsRatingQueries';
import UsersUsersRatingQueries from './queris/UsersQueries/UsersUsersRatingQueries';
import UsersWatchedMemesQueries from './queris/UsersQueries/UsersWatchedMemesQueries';
import VkUserQueries from './queris/UsersQueries/VkUserQueries';
import IMemesBaseQueries from '../IQueries/IMemesQueries/IMemesBaseQueries';
import IMemesTagsQueries from '../IQueries/IMemesQueries/IMemesTagsQueries';
import MemesBaseQueries from './queris/MemesQueries/MemesBaseQueries';
import MemesTagsQueries from './queris/MemesQueries/MemesTagsQueries';
import { ITagsBaseQueries } from '../IQueries/ITagsQueries/ITagsBaseQueries';
import TagsBaseQueries from './queris/TagsQueries/TagsBaseQueries';
import config from '../../../config';
import ISelectionMemesQueries from '../IQueries/ISelectionMemesQueries/ISelectionMemesBaseQueries';
import SelectionMemesBaseQueries from './queris/SelectionMemesQueries/SelectionMemesBaseQueries';
import IDevBaseQueries from '../IQueries/IDevQueries/IDevBaseQueries';
import DevBaseQueries from './queris/DevQueries/DevBaseQueries';

export interface IExtensions {
    users: {
        usersBaseQueries: IUsersBaseQueries;
        usersMemesQueries: IUsersMemesQueries;
        usersTagsRatingQueries: IUsersTagsRatingQueries;
        usersUsersRatingQueries: IUsersUsersRatingQueries;
        usersWatchedMemesQueries: IUsersWatchedMemesQueries;
        vkUsersQueries: IVkUsersQueries;
    };
    memes: {
        memesBaseQueries: IMemesBaseQueries;
        memesTagsQueries: IMemesTagsQueries;
    };
    tags: {
        tagsBaseQueries: ITagsBaseQueries;
    };
    selectMemes: {
        selectionMemesBaseQueries: ISelectionMemesQueries;
    };
    dev: {
        devBaseQueries: IDevBaseQueries;
    };
}

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;
const initOptions: IInitOptions<IExtensions> = {
    extend(obj: ExtendedProtocol) {
        obj.users = {
            usersBaseQueries: new UsersBaseQueries(obj),
            usersMemesQueries: new UsersMemesQueries(obj),
            usersTagsRatingQueries: new UsersTagsRatingQueries(obj),
            usersUsersRatingQueries: new UsersUsersRatingQueries(obj),
            usersWatchedMemesQueries: new UsersWatchedMemesQueries(obj),
            vkUsersQueries: new VkUserQueries(obj),
        };
        obj.memes = {
            memesBaseQueries: new MemesBaseQueries(obj),
            memesTagsQueries: new MemesTagsQueries(obj),
        };
        obj.tags = {
            tagsBaseQueries: new TagsBaseQueries(obj),
        };
        obj.selectMemes = {
            selectionMemesBaseQueries: new SelectionMemesBaseQueries(obj),
        };
        obj.dev = {
            devBaseQueries: new DevBaseQueries(obj),
        };
    },
};

export const pgp: IMain = pgPromise(initOptions);
export const db: ExtendedProtocol = pgp(config.db.address);
