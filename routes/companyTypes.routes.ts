import { Router } from "express";
import { getAllCompanyTypes } from "../controllers/companyTypes.controllers";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get('/company-types', verifyToken, asyncHandler(getAllCompanyTypes));

export default router;