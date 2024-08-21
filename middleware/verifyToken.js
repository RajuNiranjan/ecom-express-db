import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const VerifyToken = (req, res) => {
    try {
        const token = req.headers.token;
        const newtoken = req.query.token;
        console.log("newtoekn", newtoken)
        console.log(token, "token")
        if (!newtoken) {
            return res.status(401).json({ message: "no token" });
        }
        const payload = jwt.verify(newtoken, process.env.JWT_SECRET);
        console.log(payload, "payload")
        if (payload) {
            req.user = payload;
            return res.status(200).json({ user: payload })
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error in verify token" });
    }
}