import { User } from 'types';
import { prisma } from './db';

export const createUser = async (userData: User) => {
  const createUserPromises = userData.authentication.map(auth => {
    return prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        authentication: {
          create: {
            password: auth.password,
            salt: auth.salt,
            sessionToken: auth.sessionToken,
            authType: auth.authType,
          },
        },
      },
    });
  });
  return Promise.all(createUserPromises);
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
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateUserById = async (id: string, updateData: User) => {
  const updateUserPromises = updateData.authentication.map(auth => {
    return prisma.user.update({
      where: { id },
      data: {
        username: updateData.username,
        email: updateData.email,
        authentication: {
          update: {
            where: { id: auth.id },
            data: {
              password: auth.password,
              salt: auth.salt,
              sessionToken: auth.sessionToken,
              authType: auth.authType,
            },
          },
        },
      },
    });
  });
  return Promise.all(updateUserPromises);
};
