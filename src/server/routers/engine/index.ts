import express from 'express';
import memesEngineRoutes from './memesEngineRoutes';
import selectMemesEngineRoutes from './selectMemesEngineRoutes';
import tagsEngineQueries from './tagsEngineRoutes';
import usersEngineQueries from './usersEngingeRoutes';

const router = express.Router();

router.use(memesEngineRoutes);
router.use(selectMemesEngineRoutes);
router.use(tagsEngineQueries);
router.use(usersEngineQueries);

export default router;
