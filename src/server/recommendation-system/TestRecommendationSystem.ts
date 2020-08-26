import IRecommendationSystem from './IRecommendationSystem';

class TestRecommendationSystem implements IRecommendationSystem {
    getValueForDynamicRating(tag, like): number {
        return like ? 1 : -1;
    }
    getDynamicRatingModuloConstraint(): number {
        return 10;
    }
    getSmartTopLifeTimeConstant(): number {
        return 24 * 60 * 60;
    }
    getTopPackCount(): number {
        return 10;
    }
}

const testRecommendationSystem = new TestRecommendationSystem();
export default testRecommendationSystem;
