const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { check } = require("express-validator");

//target:register new user ,route:/auth/singup
router.post(
  "/signup",
  [
    check("name", "name is required.").trim().not().isEmpty(),
    check("email", "email is invalid").isEmail().normalizeEmail(),
    check("password","password must be at least 6 chars").trim().isLength({ min: 6 }),
  ],
  AuthController.signUp
);

//target:login in ,route:/auth/singin
router.post("/signin", check("email").isEmail(), AuthController.signIn);

module.exports = router;
