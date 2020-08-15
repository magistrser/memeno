import { UserId } from '../db/IQueries/IUsersQueries/IUsersBaseQueries/User';
import { MemId } from '../db/IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { TagId } from '../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';
import { VkUserId } from '../db/IQueries/IUsersQueries/IVkUsersQueries/VkUser';

export type AddVkUser = {
    vk_id: VkUserId;
    email: string | null;
    fullName: string | null;
    photoUrl: string | null;
    vkProfileUrl: string;
};

export type LikeMem = {
    user_id: UserId;
    mem_id: MemId;
};
export type DislikeMem = {
    user_id: UserId;
    mem_id: MemId;
};

export type AddMem = {
    data: byte[];
    tags: TagId[];
    user_id: UserId;
};

export type RemoveUser = {
    user_id: UserId;
};
export type RemoveMem = {
    mem_id: MemId;
};
export type RemoveTag = {
    tag: TagId;
};

export type GetMemesToShowForUser = {
    user_id: UserId;
};
export type GetMemesToShowForUserMem = {
    mem_id: MemId;
    data: byte[];
};

export default interface IEngine {
    addVkUser(req: AddVkUser): UserId;
    removeUser(req: RemoveUser): void;

    likeMem(req: LikeMem): void;
    dislikeMem(req: DislikeMem): void;

    addMem(req: AddMem): MemId;
    removeMem(req: RemoveMem): void;

    removeTag(req: RemoveTag): void;

    getMemesToShowForUser(
        req: GetMemesToShowForUser
    ): GetMemesToShowForUserMem[];
}
