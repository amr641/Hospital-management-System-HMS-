import { NextFunction, Request, Response } from "express";
import User from "../../../config/schemas/user.schema";
import { AppError } from "../../utils/appError";
import { where } from "sequelize";
// get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    let users = await User.findAll()
    if (!users.length) throw new AppError("No users found.", 404)
    res.status(200).json({ message: "success", users })
}
// get user by primary key
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findByPk(req.params.id)
    if (!user) throw new AppError("user not found", 404)
    res.status(200).json({ message: "success", user })
}
// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.update(req.body, { where: { id: req.params.id } })
    if (!user) throw new AppError("user not found", 404)
    res.status(200).json({ message: "success" })
}
// soft deleting
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.destroy({ where: { id: req.params.id } })
    if (!user) throw new AppError("user not found", 404)
    res.status(200).json({ message: "success" })
}
export {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}