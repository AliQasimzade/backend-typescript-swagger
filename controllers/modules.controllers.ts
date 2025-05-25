import { Request, Response, NextFunction } from "express";
import { PrismaClient, Module, ModulePage } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";

const prisma = new PrismaClient();

export const getUserModules = async (req: Request, res: Response<Module[] | ErrorResponse>, next: NextFunction) => {
    try {
        const modules = await prisma.module.findMany();

        return res.status(200).json(modules);
    } catch (err) {
        next(err);
    }
}

export const getByModuleId = async (
    req: Request,
    res: Response<ModulePage[] | ErrorResponse>,
    next: NextFunction
) => {
    try {
        const { moduleIdHash } = req.params;

        if (!moduleIdHash) {
            res.status(400).json({
                message: "No such moduleIdHash module",
                status: 400,
            });
        }

        const findByModulePages = await prisma.modulePage.findMany({
            where: {
                moduleId: moduleIdHash,
            },
        });

        res.status(200).json(findByModulePages);
    } catch (err) {
        next(err);
    }
};

