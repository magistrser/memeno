import IRecommendationSystem from './IRecommendationSystem';

class TestRecommendationSystem implements IRecommendationSystem {
    getValueForDynamicRating(tag, like): number {
        return like ? 1 : -1;
    }
    getDynamicRatingModuloConstraint(): number {
        return 10;
    }
    getSmartTopTimeConstant(): number {
        return 24 * 60 * 60 * 1000;
    }
}

const testRecommendationSystem = new TestRecommendationSystem();
export default testRecommendationSystem;
