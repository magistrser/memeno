import {
    AccessLevel,
    accessLevelToNumber,
} from '../db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';

function checkAccessLevel(level, needLevel) {
    return accessLevelToNumber(level) >= accessLevelToNumber(needLevel);
}

function needAccess(req, res, next, needLevel) {
    if (checkAccessLevel(req.user.access_level, needLevel)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

export function needCommonAccess(req, res, next) {
    return needAccess(req, res, next, AccessLevel.common);
}

export function needModeratorAccess(req, res, next) {
    return needAccess(req, res, next, AccessLevel.moderator);
}

export function needDeveloperAccess(req, res, next) {
    return needAccess(req, res, next, AccessLevel.developer);
}

export function needAdminAccess(req, res, next) {
    return needAccess(req, res, next, AccessLevel.admin);
}
