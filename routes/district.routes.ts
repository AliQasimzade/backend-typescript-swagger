import { Router } from "express";
import {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
  getFilterableCountryColumnsData,
  changeStatus,
} from "../controllers/district.controller";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/district", verifyToken, asyncHandler(getAllDistricts));
router.get("/district/:id_hash", verifyToken, asyncHandler(getDistrictById));
router.get(
  "/districties/get-filterable-columns-data",
  verifyToken,
  asyncHandler(getFilterableCountryColumnsData)
);
router.post("/district", verifyToken, asyncHandler(createDistrict));
router.put("/district/:id_hash", verifyToken, asyncHandler(updateDistrict));
router.delete("/district/:id_hash", verifyToken, asyncHandler(deleteDistrict));
router.patch(
  "/district/update-status/:id_hash/:isActive",
  verifyToken,
  asyncHandler(changeStatus)
);

export default router;
