import express from 'express';
import memesEngineRoutes from './memes';
import selectMemesEngineRoutes from './select';
import tagsEngineRoutes from './tags';
import usersEngineRoutes from './users';
import devEngineRoutes from './dev';

const router = express.Router();

router.use(memesEngineRoutes);
router.use(selectMemesEngineRoutes);
router.use(tagsEngineRoutes);
router.use(usersEngineRoutes);
router.use(devEngineRoutes);

export default router;
