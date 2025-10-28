
import {Router} from "express";


import { signUp , login , logout , sendVerificationOtp , verifyAccount , isAuthenticated  , sendResetOtp} from "../controllers/auth.controller.js";

import verifyTokens from "../middlewares/verifyTokens.js";
import { sendOtp } from "../middlewares/sendOtp.middleware.js";  // middleware for otp sending work

const router = Router();


router.route("/signup").post(signUp);
router.route("/login").post(login);

router.route("/logout").post(verifyTokens,logout);

router.route("/send-verification-otp").post( sendOtp,sendVerificationOtp);

router.route("/verify-account").post(verifyTokens , verifyAccount);

router.route("/is-auth").post(isAuthenticated);

router.route("/reset-password").post(sendResetOtp);

export default router;