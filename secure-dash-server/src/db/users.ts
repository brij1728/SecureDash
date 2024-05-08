import { ObjectId } from 'bson';
import { User } from 'types';
import { prisma } from './db';

export const createUser = async (userData: User) => {
  return await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      authentication: {
        create: userData.authentication.map(auth => ({
          password: auth.password,
          salt: auth.salt,
          sessionToken: auth.sessionToken,
          authType: auth.authType,
        })),
      },
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { authentication: true },
  });
};

export const getUserBySessionToken = async (sessionToken: string) => {
  return await prisma.authRecord.findUnique({
    where: { sessionToken },
    include: { user: true },
  });
};

export const getUserById = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    console.log("Invalid ID format", id);
    return null;
  }
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const deleteUserById = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    console.log("Invalid ID format", id);
    return null;
  }
  try {
    return await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; 
  }
};

export const updateUserById = async (id: string, updateData: User) => {
  if (!ObjectId.isValid(id)) {
    console.log("Invalid ID format", id);
    return null;
  }
  return await prisma.user.update({
    where: { id },
    data: {
      username: updateData.username,
      email: updateData.email,
      authentication: {
        updateMany: updateData.authentication.map(auth => ({
          where: { id: auth.id }, 
          data: {
            password: auth.password,
            salt: auth.salt,
            sessionToken: auth.sessionToken,
            authType: auth.authType, 
          },
        })),
      },
    },
  });
};
