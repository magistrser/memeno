import express from 'express';
import memesEngineRoutes from './memesEngineRoutes';
import selectMemesEngineRoutes from './selectMemesEngineRoutes';
import tagsEngineRoutes from './tagsEngineRoutes';
import usersEngineRoutes from './usersEngingeRoutes';
import devEngineRoutes from './devEngineRoutes';

const router = express.Router();

router.use(memesEngineRoutes);
router.use(selectMemesEngineRoutes);
router.use(tagsEngineRoutes);
router.use(usersEngineRoutes);
router.use(devEngineRoutes);

export default router;
