import { Request, Response, NextFunction } from "express";
import { PrismaClient, Country } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";

const prisma = new PrismaClient();

export const getAllCountries = async (req: Request, res: Response<Country[] | ErrorResponse>, next: NextFunction) => {
    try {
        const countries = await prisma.country.findMany();
        return res.status(200).json(countries);
    } catch (err) {
        next(err);
    }
}

export const getCountryById = async (req: Request<{ id_hash: string }, {}, {}>, res: Response<Country | ErrorResponse>, next: NextFunction) => {
    try {
        const { id_hash } = req.params;

        if (!id_hash) {
            return res.status(400).json({
                message: "Id hash is incorrect",
                status: 400
            })
        }
        const findCountryById = await prisma.country.findUnique({ where: { id_hash } });

        if (!findCountryById) {
            return res.status(400).json({
                message: "Not such country",
                status: 400
            })
        };

        return res.status(200).json(findCountryById);
    } catch (err) {
        next(err);
    }
}

export const createCountry = async (
    req: Request<{}, {}, { name: string; code: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, code } = req.body;

        if (!name) {
            throw new Error("Name is required");
        }

        if (!code) {
            throw new Error("Code is required");
        }

        const country = await prisma.country.create({
            data: { name, code },
        });

        return res.status(201).json({
            message: "New country is created",
            data: country,
        });
    } catch (err) {
        next(err);
    }
};

export const updateCountry = async (req: Request<{ id_hash: string }, {}, { name?: string, code?: string }>, res: Response, next: NextFunction) => {
    try {
        const { id_hash } = req.params;
        const data = req.body;

        if (!id_hash) throw new Error('id_hash is required');
        if (!data.name && !data.code) throw new Error('Name or code are required');

        const findCountryByIdHash = await prisma.country.findUnique({ where: { id_hash } });

        if (!findCountryByIdHash) throw new Error('Country not found with the given id_hash');

        await prisma.country.update({
            where: { id_hash },
            data
        });

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}


export const deleteCountry = async (req: Request<{ id_hash: string }>, res: Response<ErrorResponse>, next: NextFunction) => {
    try {
        const { id_hash } = req.params;

        if (!id_hash) throw new Error('id_hash is required');

        const findCountryByIdHash = await prisma.country.findUnique({ where: { id_hash } });

        if (!findCountryByIdHash) throw new Error('Country not found with the given id_hash');

        await prisma.country.delete({ where: { id_hash } });

        return res.status(200).json({
            message: "Coutry is deleted",
            status: 200
        })
    } catch (err) {
        next(err);
    }
}

export const getFilterableCountryColumnsData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const countries = await prisma.country.findMany({
            select: {
                name: true,
                code: true,
            },
        });

        const nameSet = new Set<string>();
        const codeSet = new Set<string>();

        countries.forEach((country) => {
            if (country.name) nameSet.add(country.name);
            if (country.code) codeSet.add(country.code);
        });

        const response = [
            {
                field: 'name',
                values: Array.from(nameSet),
            },
            {
                field: 'code',
                values: Array.from(codeSet),
            },
        ];

        return res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};
