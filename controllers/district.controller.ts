import { Request, Response, NextFunction } from "express";
import { PrismaClient, District } from "../generated/prisma";
import { ErrorResponse } from "../types/error.types";

const prisma = new PrismaClient();

export const getAllDistricts = async (
  req: Request,
  res: Response<District[] | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const districts = await prisma.district.findMany();

    return res.status(200).json(districts);
  } catch (err) {
    next(err);
  }
};

export const getDistrictById = async (
  req: Request<{ id_hash: string }>,
  res: Response<District | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { id_hash } = req.params;

    if (!id_hash) throw new Error("id_hash is required");

    const findDistrictByIdHash = await prisma.district.findUnique({
      where: { id_hash },
    });

    if (!findDistrictByIdHash)
      throw new Error("District not found with the given id_hash");

    return res.status(200).json(findDistrictByIdHash);
  } catch (err) {
    next(err);
  }
};

export const createDistrict = async (
  req: Request<{}, {}, { name: string; country_id_hash: string }>,
  res: Response<District | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { name, country_id_hash } = req.body;
    const user = req.user;

    if (!name) throw new Error("name is required");
    if (!country_id_hash) throw new Error("country_id_hash is required");

    const country = await prisma.country.findUnique({
      where: { id_hash: country_id_hash },
    });

    if (!country) throw new Error("Country not found with the given id_hash");

    await prisma.district.create({
      data: {
        country_name: country.name,
        country_id_hash,
        inserted_user: user.username,
        inserted_user_id_hash: user.id_hash,
        name,
        is_deleted: false,
      },
    });

    return res.status(201).json({
      message: "New district created",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
};

export const updateDistrict = async (
  req: Request<{ id_hash: string }, {}>,
  res: Response<District | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { id_hash } = req.params;
    const data = req.body;

    if (!data.name && !data.country_id_hash)
      throw new Error("name or country_id_hash are required");

    const district = await prisma.district.findUnique({ where: { id_hash } });

    if (!district) throw new Error("District not found with the given id_hash");

    if (!data.country_id_hash) {
      await prisma.district.update({ where: { id_hash }, data: { ...data } });
      return res.status(204).send();
    } else {
      const country = await prisma.country.findUnique({
        where: { id_hash: data.country_id_hash },
      });

      if (!country)
        throw new Error("District not found with the given id_hash");

      const sameCountryIdHash: boolean =
        country.id_hash === data.country_id_hash;

      await prisma.district.update({
        where: {
          id_hash,
        },
        data: {
          ...data,
          country_name: sameCountryIdHash
            ? district.country_name
            : country.name,
        },
      });

      return res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};

export const deleteDistrict = async (
  req: Request<{ id_hash: string }>,
  res: Response<District | ErrorResponse>,
  next: NextFunction
) => {
  try {
    const { id_hash } = req.params;

    if (!id_hash) throw new Error("id_hash is required");

    const district = await prisma.district.findUnique({ where: { id_hash } });

    if (!district) throw new Error("District not found with the given id_hash");

    await prisma.district.delete({ where: { id_hash } });

    return res.status(200).json({
      message: "District is deleted",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

export const getFilterableCountryColumnsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const districts = await prisma.district.findMany({
      select: {
        id_hash: true,
        name: true,
        country_name: true,
        country_id_hash: true,
        inserted_user: true,
        inserted_user_id_hash: true,
        is_deleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const id_hashSet = new Set<string>();
    const nameSet = new Set<string>();
    const countryNameSet = new Set<string>();
    const countryIdHashSet = new Set<string>();
    const insertedUserSet = new Set<string>();
    const insertedUserIdHashSet = new Set<string>();
    const isDeletedSet = new Set<boolean>();
    const createdAtSet = new Set<string>();
    const updatedAtSet = new Set<string>();

    districts.forEach((district) => {
      if (district.id_hash) id_hashSet.add(district.id_hash);
      if (district.name) nameSet.add(district.name);
      if (district.country_name) countryNameSet.add(district.country_name);
      if (district.country_id_hash)
        countryIdHashSet.add(district.country_id_hash);
      if (district.inserted_user) insertedUserSet.add(district.inserted_user);
      if (district.inserted_user_id_hash)
        insertedUserIdHashSet.add(district.inserted_user_id_hash);
      if (typeof district.is_deleted === "boolean")
        isDeletedSet.add(district.is_deleted);
      if (district.createdAt)
        createdAtSet.add(district.createdAt.toISOString());
      if (district.updatedAt)
        updatedAtSet.add(district.updatedAt.toISOString());
    });

    const response = [
      { field: "id_hash", values: Array.from(id_hashSet) },
      { field: "name", values: Array.from(nameSet) },
      { field: "country_name", values: Array.from(countryNameSet) },
      { field: "country_id_hash", values: Array.from(countryIdHashSet) },
      { field: "inserted_user", values: Array.from(insertedUserSet) },
      {
        field: "inserted_user_id_hash",
        values: Array.from(insertedUserIdHashSet),
      },
      { field: "is_deleted", values: Array.from(isDeletedSet) },
      { field: "createdAt", values: Array.from(createdAtSet) },
      { field: "updatedAt", values: Array.from(updatedAtSet) },
    ];

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const changeStatus = async (
  req: Request<{ id_hash: string; isActive: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_hash, isActive } = req.params;

    if (!id_hash) throw new Error("id_hash is required");
    if (!isActive) throw new Error("isActive is required");

    const status = isActive == "true";

    const district = await prisma.district.findUnique({
      where: { id_hash },
    });

    if (!district) throw new Error("District not found with the given id_hash");

    await prisma.district.update({
      where: { id_hash },
      data: {
        is_deleted: status,
      },
    });

    return res.status(200).json({
      message: "District status is changed",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
