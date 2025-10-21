
import {Router} from "express";

import { signUp , login , logout } from "../controllers/auth.controller.js";
import verifyTokens from "../middlewares/verifyTokens.js";

const router = Router();


router.route("/signup").post(signUp);
router.route("/login").post(login);

router.route("/logout").post(verifyTokens,logout);

export default router;