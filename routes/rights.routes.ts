import { Router } from "express";
import { getAllRights } from "../controllers/right.controllers";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get('/rights', verifyToken, asyncHandler(getAllRights));

export default router