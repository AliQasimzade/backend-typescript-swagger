import { Router } from "express";
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getFilterableCountryColumnsData,
  changeStatus,
} from "../controllers/country.controllers";
import { verifyToken } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/country", verifyToken, asyncHandler(getAllCountries));
router.get("/country/:id_hash", verifyToken, asyncHandler(getCountryById));
router.get(
  "/countries/get-filterable-columns-data",
  verifyToken,
  asyncHandler(getFilterableCountryColumnsData)
);
router.post("/country", verifyToken, asyncHandler(createCountry));
router.put("/country/:id_hash", verifyToken, asyncHandler(updateCountry));
router.delete("/country/:id_hash", verifyToken, asyncHandler(deleteCountry));
router.patch(
  "/country/update-status/:id_hash/:isActive",
  verifyToken,
  asyncHandler(changeStatus)
);

export default router;
