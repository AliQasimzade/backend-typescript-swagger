import { Request, Response, NextFunction } from "express";
import { PrismaClient, CompanyType } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";

const prisma = new PrismaClient();

export const getAllCompanyTypes = async (req: Request, res: Response<CompanyType[] | ErrorResponse>, next: NextFunction) => {
    try {
        const companyTypes = await prisma.companyType.findMany();

        return res.status(200).json(companyTypes);
    } catch (err) {
        next(err);
    }
}