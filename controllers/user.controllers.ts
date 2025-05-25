import { Request, Response, NextFunction } from "express";
import { PrismaClient, Users } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface RequestBody {
    username: string,
    password: string
}

interface LoginResBody {
    token: string,
    token_type: string,
    expiry_time: number
}

type UserWithoutPassword = {
    id_hash: string;
    username: string;
    role: string;
    isActive: boolean;
    updatedAt: Date;
    createdAt: Date;
};

export const register = async (req: Request<{}, {}, RequestBody>, res: Response<Users | ErrorResponse>, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password || username.trim() === "" || password.trim() === "") {
            return res.status(400).json({
                message: "Username and password are required and cannot be empty",
                status: 400,
            });
        };

        const findUserByUsername = await prisma.users.findFirst({ where: { username } });

        if (findUserByUsername) {
            return res.status(400).json({
                message: "Already this username is exsist",
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        return res.status(201).json({
            message: "New user is created but you can login after Admin accept your profile",
            status: 201
        })
    } catch (err: any) {
        next(err);
    }
}

export const activateUser = async (
    req: Request<Record<string, string>>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id_hash, status } = req.params;

        if (!id_hash || !status || id_hash.trim() === "" || status.trim() === "") {
            res.status(400).json({ message: "ID and Status are required and cannot be empty", status: 400 });
            return;
        }


        const userStatus = status === "true";

        const findUserById = await prisma.users.findUnique({ where: { id_hash } });

        if (!findUserById) {
            res.status(400).json({ message: "No such ID user", status: 400 });
            return;
        }

        await prisma.users.update({
            where: { id_hash },
            data: { isActive: userStatus },
        });

        res.status(200).json({ message: "Changed user status", status: 200 });
        return;

    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request<{}, {}, RequestBody>, res: Response<Users | ErrorResponse | LoginResBody>, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password || username.trim() === "" || password.trim() === "") {
            return res.status(400).json({
                message: "Username and password are required and cannot be empty",
                status: 400,
            });
        };

        const findUserByUserName = await prisma.users.findFirst({ where: { username } });

        if (!findUserByUserName) {
            return res.status(400).json({
                message: "Invalid credentials",
                status: 400
            })
        }

        if (!findUserByUserName.isActive) {
            return res.status(400).json({
                message: "This user status is deactive",
                status: 400
            })
        }
        const checkCompareHashPassword = await bcrypt.compare(password, findUserByUserName.password);

        if (!checkCompareHashPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                status: 400
            })
        };

        const expiresIn = 60 * 60;

        const token = jwt.sign(
            {
                id_hash: findUserByUserName.id_hash,
                username: findUserByUserName.username,
                role: findUserByUserName.role,
                isActive: findUserByUserName.isActive,
            },
            process.env.JWT_SECRET as string,
            { expiresIn }
        );

        return res.status(200).json({
            token,
            token_type: "Bearer",
            expiry_time: expiresIn
        })

    } catch (err) {
        next(err)
    }
}

export const getAllUsers = async (req: Request, res: Response<UserWithoutPassword[] | ErrorResponse>, next: NextFunction) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                username: true,
                id_hash: true,
                role: true,
                isActive: true,
                updatedAt: true,
                createdAt: true,
            }
        });

        return res.status(200).json(users);

    } catch (err: any) {
        next(err);
    }
}