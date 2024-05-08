import { Request, Response } from "express";
import { deleteUserById, prisma } from "../db";

import { ObjectId } from 'mongodb';

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



export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const deleteUser = await deleteUserById(id);

        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required" });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { username, email },
        });

        return res.status(200).json({ updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
