import IRecommendationSystem from './IRecommendationSystem';

class TestRecommendationSystem implements IRecommendationSystem {
    getValueForDynamicRating(tag, like): number {
        return like ? 1 : -1;
    }
    getModuloConstraint(): number {
        return 10;
    }
}

const testRecommendationSystem = new TestRecommendationSystem();
export default testRecommendationSystem;
