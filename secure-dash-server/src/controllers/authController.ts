import { Request, Response } from "express";
import { generateSalt, generateSessionToken, hashPassword } from '../utils';

import { prisma } from "../db";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, authType } = req.body;
    if (!email || !password || !authType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
      include: { authentication: true }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const authRecord = user.authentication.find(auth => auth.authType === authType);
    if (!authRecord) {
      return res.status(404).json({ message: "Authentication method not found" });
    }
    const { salt, password: hashedPassword } = authRecord;
    if (hashedPassword !== hashPassword(password, salt)) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const sessionToken = hashPassword(generateSessionToken(), salt);
    await prisma.authRecord.update({
      where: { id: authRecord.id },
      data: { sessionToken }
    });
    res.cookie("BRIJESH-AUTH", sessionToken, { domain: "localhost", path: "/" });
    return res.status(200).json({
      username: user.username,
      email: user.email
    }).end();
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, authType } = req.body;
    if (!username || !email || !password || !authType) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    const sessionToken = generateSessionToken();
    const user = await prisma.user.create({
      data: {
        username,
        email,
        authentication: {
          create: [{
            password: hashedPassword,
            salt,
            sessionToken,
            authType
          }]
        }
      }
    });
    return res.status(201).json({ user }).end();
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
