import express from 'express'
import { LogIn, Register } from '../controllers/auth.controller.js'
import { VerifyToken } from '../middleware/verifyToken.js'

export const AuthRouter = express.Router()

AuthRouter.post('/register', Register)
AuthRouter.post('/login', LogIn)
AuthRouter.get('/verify', VerifyToken)
