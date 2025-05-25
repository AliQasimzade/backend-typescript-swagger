import { Request, Response, NextFunction } from "express";
import { PrismaClient, Right } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";

const prisma = new PrismaClient();

export const getAllRights = async (req: Request, res: Response<Right[] | ErrorResponse>, next: NextFunction) => {
    try {
        const rights = await prisma.right.findMany();
        return res.status(200).json(rights)
    } catch (err) {
        next(err);
    }
}