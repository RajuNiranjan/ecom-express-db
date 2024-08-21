import { AuthModel } from '../models/auth.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body

        const existingUser = await AuthModel.findOne({ $or: [{ email }, { userName }] })
        if (existingUser) {
            return res.status(409).json({ message: "Email or user name already exists" }) // Changed status code to 409 for conflict
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await AuthModel.create({
            userName, email, password: hashPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
        const userResponse = {
            _id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            token: token
        }

        res.status(201).json({ message: "user create successfully", user: userResponse })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error during register" })
    }
}


export const LogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await AuthModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Invalid email" })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

        const userResponse = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: token
        }

        res.status(200).json({ message: "User login successfully", user: userResponse })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error during login" })
    }
}

