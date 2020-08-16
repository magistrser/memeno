import express from 'express';
import { User } from './db/IQueries/IUsersQueries/IUsersBaseQueries/User';

export interface IGetUserAuthInfoRequest extends express.Request {
    isAuthenticated: () => boolean;
    user: User;
}
