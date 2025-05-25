import { Router } from "express";
import { getByModuleId, getUserModules } from "../controllers/modules.controllers";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get('/Module/GetUserModules', verifyToken, asyncHandler(getUserModules));
router.get<{ moduleIdHash: string }>('/ModulePage/GetForUserByModuleId/:moduleIdHash', verifyToken, asyncHandler(getByModuleId));

export default router;