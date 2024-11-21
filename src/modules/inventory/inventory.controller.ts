import { Request, Response } from "express";
import Inventory from "../../../config/schemas/inventory.schema";
import { AppError } from "../../utils/appError";
import { IInventory } from "./inventory.INTF";

let itemNotFound = new AppError("item not found", 404)

const addItem = async (req: Request, res: Response): Promise<void> => {
    req.body.handled_by = req.user?.SSN
    let item: IInventory = await Inventory.create(req.body)
    res.status(201).json({ messsage: "success", item })
}
const getAllItems = async (req: Request, res: Response): Promise<void> => {
    let items: IInventory[] = await Inventory.findAll()
    if (!items.length) throw new AppError("no items found", 404)
    res.status(201).json({ messsage: "success", items })
}
const getItem = async (req: Request, res: Response): Promise<void> => {
    let item: IInventory | null = await Inventory.findByPk(req.params.id)
    if (!item) throw itemNotFound
    res.status(200).json({ message: "success", item })
}
const updateItem = async (req: Request, res: Response): Promise<void> => {
    let { id } = req.params
    const [affectedRows, [updatedItem]] = await Inventory.update(req.body, {
        where: { id },
        returning: true,
    });
    if (!affectedRows) throw itemNotFound
    res.status(200).json({ message: "success", data: updatedItem })
}
const deleteItem = async (req: Request, res: Response): Promise<void> => {
    // find the item
    const item: IInventory | null = await Inventory.findByPk(req.params.id)
    if (!item) throw itemNotFound
    // destoy it
    await Inventory.destroy({ where: { id: item.id } })
    res.status(200).json({ message: "success", item })
}

export {
    addItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem
}