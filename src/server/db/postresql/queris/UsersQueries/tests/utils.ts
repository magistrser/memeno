import { db } from '../../../index';
import { AuthType } from '../../../../IQueries/IUsersQueries/IUsersBaseQueries/AuthType';

export default class UsersQueriesUtils {
    static async createUser(
        next: (args: any[]) => Promise<null>,
        args: any[] = []
    ): Promise<null> {
        const user_id = await db.users.usersBaseQueries.createNewUser({
            auth_type: AuthType.vk,
        });
        expect(typeof user_id).toBe('number');

        args.push(user_id);
        await next(args);

        await db.users.usersBaseQueries.removeUser({ user_id });
        const deleted_user = await db.users.usersBaseQueries.getUser({
            user_id,
        });
        expect(deleted_user).toBeNull();
    }
}
