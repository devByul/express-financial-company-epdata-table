import express from "express";
import danawaController from "../../controller/danawa";

const router = express.Router();

router.get("/finacial", danawaController.comparisonDataByFinancialCompany);
router.get("/select", danawaController.getCarSelectItemAll);

export default router;
