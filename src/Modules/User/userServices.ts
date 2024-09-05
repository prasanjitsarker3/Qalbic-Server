import { optionsPaginationFields, userSearchingField } from "./userConstant";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../App/Common/Prisma";
import { IPaginationOptions, IUser, TUpdateProfile } from "./userInterface";
import bcrypt from "bcrypt";
import paginationCalculation from "../../Utilities/paginationCalculation";
import { ITokenUser } from "../../App/Common/authType";

const createAdminIntoDB = async (payload: IUser) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 12);

  const result = await prisma.$transaction(async (tx) => {
    const adminData = {
      name: payload.name,
      email: payload.email,
      password: hashPassword,
      role: UserRole.ADMIN,
    };

    const user = await tx.user.create({
      data: adminData,
    });

    const profileData = {
      name: payload.name,
      email: payload.email,
    };

    await tx.profile.create({ data: profileData });
    return user;
  });
  return result;
};

const getAllUserFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationCalculation(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.UserWhereInput[] = [];
  if (params.searchTerm) {
    andCondition.push({
      OR: userSearchingField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  andCondition.push({
    status: UserStatus.ACTIVE,
  });
  const whereCondition: Prisma.UserWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "asc",
          },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      profile: true,
    },
  });
  const total = await prisma.user.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const myProfileFromDB = async (user: ITokenUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const profileData = await prisma.profile.findUniqueOrThrow({
    where: {
      email: userData.email,
    },
  });

  return profileData;
};

const profileUpdateFromDB = async (
  user: ITokenUser,
  payload: TUpdateProfile
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.profile.update({
    where: {
      email: userData.email,
    },
    data: payload,
  });

  return result;
};

export const userServices = {
  createAdminIntoDB,
  getAllUserFromDB,
  myProfileFromDB,
  profileUpdateFromDB,
};
