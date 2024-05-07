import { Request, Response } from "express";

import { prisma } from "../db";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { limit, skip, sort } = req.query;

        const queryOptions = {
            take: limit ? parseInt(limit as string, 10) : undefined,
            skip: skip ? parseInt(skip as string, 10) : undefined,
            orderBy: sort ? {
                username: sort as 'asc' | 'desc'  
            } : undefined,
        };

        const users = await prisma.user.findMany({
            ...queryOptions,
            select: { 
                id: true,
                username: true,
                email: true, 
            }
        });

        return res.status(200).json({ users });
    } catch (error) {
        console.error("Get all users error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
