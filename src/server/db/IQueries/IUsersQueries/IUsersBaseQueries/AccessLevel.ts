export enum AccessLevel {
    common = 'common',
    moderator = 'moderator',
    developer = 'developer',
    admin = 'admin',
}

export function accessLevelToNumber(level: AccessLevel): number {
    switch (level) {
        default:
        case AccessLevel.common:
            return 0;
        case AccessLevel.moderator:
            return 1;
        case AccessLevel.developer:
            return 2;
        case AccessLevel.admin:
            return 3;
    }
}
