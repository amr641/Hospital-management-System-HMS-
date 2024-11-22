import { Request, Response, NextFunction } from "express";
import Room from "../../../config/schemas/room.schema";

import { AppError } from "../../utils/appError";
import { IRoom } from "./room.INTF";
export type RoomType= IRoom|null
// add a new room
const addRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let room: IRoom = await Room.create(req.body)
    res.status(200).json({ message: "success", room })
}

// update room
const updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let room: RoomType = await Room.findByPk(req.params.id)
    if (!room) throw new AppError(`Room:${req.params.id} does nor exist`, 404) // if not exist
    await Room.update(req.body, { where: { id: room.id } }) // update if exist
    res.status(200).json({ message: "success" }) //return the response
}
// delete room
const deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let room: RoomType = await Room.findByPk(req.params.id)
    if (!room) throw new AppError(`Room:${req.params.id} does not exist`, 404) // if not exist
    await room.destroy() // delete if exist
    res.status(200).json({ message: "success" }) //return the response
}

// get room
const getRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let room: RoomType = await Room.findByPk(req.params.id)
    if (!room) throw new AppError(`Room:${req.params.id} does not exist`, 404)
    res.status(200).json({ message: "success", room })
}
// get all rooms or get all rooms with department
const getAllRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let department = req.query.department as string | undefined
    let rooms: IRoom[] = await Room.findAll(
        { where: department ? { department } : undefined })
    if (!rooms.length) throw new AppError(`Room:${req.params.id} does not exist`, 404)
    res.status(200).json({ message: "success", rooms })
}
const restoreRoom = async (req: Request, res: Response, next: NextFunction) => {
    let room = await Room.findByPk(req.params.id, { paranoid: false })
    if (!room) throw new AppError("room not found", 404)
    await room.restore()
    res.status(200).json({ message: `room with id ${room.id} restored successfully` })
}
export {
    addRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getAllRooms,
    restoreRoom
}