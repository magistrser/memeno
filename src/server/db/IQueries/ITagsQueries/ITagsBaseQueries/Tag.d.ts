export type TagId = string;

type Tag = {
    tag_id: TagId;
    rating: number;
    rating_update_time: number;
};

export default Tag;
