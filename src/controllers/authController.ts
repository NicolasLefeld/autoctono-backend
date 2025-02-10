import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(401).json({ message: "Invalid username" });
            return;
        }

        // bcrypt.hash(password, 10, (err, hash) => {
        //   if (err) throw err;
        //   // Guarda el hash en la base de datos
        //   console.log(`\n\n ${hash}\n\n`);
        // });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        console.log(`IS VALID `);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        res.json({
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
