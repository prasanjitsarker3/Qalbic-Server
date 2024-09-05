import { UserRole } from "@prisma/client";

export type IUser = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type IPaginationOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type TUpdateProfile = {
  name?: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  address?: string;
};
