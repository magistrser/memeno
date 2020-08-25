export type TagId = string;

type Tag = {
    tag_id: TagId;
    rating: number;
    dynamic_rating: number;
    rating_update_time: number;
    last_like_time: number;
};

export default Tag;
