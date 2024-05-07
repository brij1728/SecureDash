import { Request, Response } from "express";
import { createUser, getUserByEmail } from '../db';
import { generateSalt, generateSessionToken, hashPassword } from '../utils';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });  
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });  
    }
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    const sessionToken = generateSessionToken();
    const user = await createUser({
      username,
      email,
      authentication: {
        password: hashedPassword,
        salt,
        sessionToken,
      },
    });
    return res.status(201).json({ user }).end();  
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });  
  }
}
