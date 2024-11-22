import { NextFunction, Request, Response } from "express";
import User from "../../../config/schemas/user.schema";
import { AppError } from "../../utils/appError";
import { IUser } from "./user.INTF";
type userType = IUser | null

let userNotFound = new AppError("user not found", 404);
// get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    let users: IUser[] = await User.findAll()
    if (!users.length) throw new AppError("No users found.", 404)
    res.status(200).json({ message: "success", users })
}
// get user by primary key
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: userType = await User.findByPk(req.params.id)
    if (!user) throw userNotFound
    res.status(200).json({ message: "success", user })
}
// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: userType = await User.findByPk(req.params.id)
    if (!user) throw userNotFound
    await User.update(req.body, { where: { id: user.id } })
    res.status(200).json({ message: "success" })
}
// soft deleting
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: userType = await User.findByPk(req.params.id)
    if (!user) throw userNotFound
    await User.destroy({ where: { id: req.params.id } })
    res.status(200).json({ message: "success" })
}
const restoreUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: userType = await User.findByPk(req.params.id, { paranoid: false })
    if (!user) throw userNotFound
    await User.restore({ where: { id: req.params.id } })
    res.status(200).json({ message: `user with id ${user.id} restored successfully` })
}
export {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    restoreUser
}