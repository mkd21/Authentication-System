
import { Router } from "express";

// import verifyTokens from "../middlewares/verifyTokens.js";

import verifyAccessToken from "../middlewares/verifyAccessToken.js";

import { getUserData } from "../controllers/userData.controller.js";

const router = Router();

router.route("/get-data").get( verifyAccessToken , getUserData);

export default router;