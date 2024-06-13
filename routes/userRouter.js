const express=require("express");
const { register, login } = require("../controller/userController");
const { registerValidation, loginValidation } = require("../validators/userValidator");
const userRouter=express.Router();


userRouter.post("/register",registerValidation,register)
userRouter.post("/login",loginValidation,login)

module.exports={userRouter}