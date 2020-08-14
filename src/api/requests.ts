import express from 'express';

export interface IGetUserAuthInfoRequest extends express.Request {
    isAuthenticated: () => boolean;
}
