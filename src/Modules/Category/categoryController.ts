import { Request, Response } from "express";
import catchAsync from "../../Utilities/catchAsync";
import { categoryService } from "./categoryService";
import sendResponse from "../../Utilities/sendResponse";
import httpStatus from "http-status";
import pick from "../../App/Common/Pick";
import { userFilterableFields } from "../User/userConstant";
import { optionsPaginationFields } from "./categoryInterface";

const createdCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createdCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category Create Successfully",
    data: result,
  });
});
const allCategory = catchAsync(async (req: Request, res: Response) => {
  const filterData = pick(req.query, userFilterableFields);
  const optionsData = pick(req.query, optionsPaginationFields);
  const result = await categoryService.getAllCategoryFormDB(
    filterData,
    optionsData
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Category Fetch Successfully",
    data: result,
  });
});
const deletedCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.categoryDeletedFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Delete Successfully",
    data: result,
  });
});

export const categoryController = {
  createdCategory,
  allCategory,
  deletedCategory,
};
