import Tag from '../db/IQueries/ITagsQueries/ITagsBaseQueries/Tag';

export default interface IRecommendationSystem {
    getValueForDynamicRating(tag: Tag, like: boolean): number;
    getModuloConstraint(): number;
}
