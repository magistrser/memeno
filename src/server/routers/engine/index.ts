import express from 'express';
import memesEngineRoutes from './memes';
import selectMemesEngineRoutes from './select';
import tagsEngineRoutes from './tags';
import usersEngineRoutes from './users';
import devEngineRoutes from './dev';
import {needCommonAccess, needDeveloperAccess} from "../../passports/validateAccessLevel";

const router = express.Router();

router.use(needCommonAccess, memesEngineRoutes);
router.use(needCommonAccess, selectMemesEngineRoutes);
router.use(needCommonAccess, tagsEngineRoutes);
router.use(needCommonAccess, usersEngineRoutes);
router.use(needDeveloperAccess, devEngineRoutes);

export default router;
