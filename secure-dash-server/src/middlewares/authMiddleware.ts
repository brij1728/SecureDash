import { NextFunction, Request, Response } from "express";

import { merge } from "lodash";
import { prisma } from "../db";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies["BRIJESH-AUTH"];
        if (!sessionToken) {
            return res.status(401).json({ message: "Unauthorized - No session token provided" });
        }

        const authRecord = await prisma.authRecord.findUnique({
            where: { sessionToken },
            include: { user: true },
        });
        
        if (!authRecord || !authRecord.user) {
            return res.status(401).json({ message: "Unauthorized - Session not valid or user not found" });
        }

        merge(req, { user: authRecord.user });

        return next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
