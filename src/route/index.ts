import express from "express";

import indexController from "../controller/index";

const router = express.Router();

router.get("/", indexController.indexPage);

export default router;
