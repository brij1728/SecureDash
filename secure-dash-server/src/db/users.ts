import { User } from "../types";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false},
  },
  
});

const UserModel = mongoose.model<User>("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
	"authentication.sessionToken": sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (user: User) => new UserModel(user).save();
export const updateUserById = (id: string, user: User) => UserModel.findByIdAndUpdate(id, user);
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({_id: id});
