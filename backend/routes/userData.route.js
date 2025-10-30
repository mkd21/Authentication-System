
import { Router } from "express";

import verifyTokens from "../middlewares/verifyTokens.js";

import { getUserData } from "../controllers/userData.controller.js";

const router = Router();

router.route("/get-data").get( verifyTokens , getUserData);

export default router;