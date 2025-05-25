import { Router } from "express";
import { register,login,activateUser, getAllUsers } from "../controllers/user.controllers";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post('/auth/register', asyncHandler(register));
router.post('/auth/login', asyncHandler(login));
router.patch('/auth/UpdateStatus/:id_hash/:status', verifyToken, asyncHandler(activateUser));
router.get('/users', verifyToken, asyncHandler(getAllUsers))

export default router;