import {
    AccessLevel,
    accessLevelToNumber,
} from '../db/IQueries/IUsersQueries/IUsersBaseQueries/AccessLevel';
import routes from '../../routes/routes';

function checkAccessLevel(level, needLevel) {
    return accessLevelToNumber(level) >= accessLevelToNumber(needLevel);
}

function needAccessHelper(req, res, next, needLevel) {
    if (needAccess(req, res, next)) {
        return;
    }

    if (checkAccessLevel(req.user.access_level, needLevel)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

export function needAccess(req, res, next) {
    if (!req.user) {
        req.baseUrl.startsWith(routes.development.root)
            ? res.redirect(routes.development.root)
            : res.redirect(routes.root);
        return true;
    }

    return false;
}

export function needCommonAccess(req, res, next) {
    return needAccessHelper(req, res, next, AccessLevel.common);
}

export function needModeratorAccess(req, res, next) {
    return needAccessHelper(req, res, next, AccessLevel.moderator);
}

export function needDeveloperAccess(req, res, next) {
    return needAccessHelper(req, res, next, AccessLevel.developer);
}

export function needAdminAccess(req, res, next) {
    return needAccessHelper(req, res, next, AccessLevel.admin);
}
