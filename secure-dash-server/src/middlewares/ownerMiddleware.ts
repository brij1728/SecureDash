import { NextFunction, Request, Response } from "express";

import { prisma } from "../db";

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["BRIJESH-AUTH"];
    if (!sessionToken) {
      return res.status(401).json({ message: "Unauthorized - No session token provided" });
    }

    const authRecord = await prisma.authRecord.findUnique({
      where: { sessionToken },
      include: { user: { include: { authentication: true } } }, 
    });

    if (!authRecord || !authRecord.user) {
      return res.status(401).json({ message: "Unauthorized - Session token is invalid or user does not exist" });
    }

    req.user = authRecord.user; 
    next();
  } catch (error) {
    console.error("Owner error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
