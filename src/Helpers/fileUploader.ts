import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import config from "../App/config";
import { ICloudinaryResponse, IFile } from "./file";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloud.CLOUDENAME,
  api_key: config.cloud.API_KEY,
  api_secret: config.cloud.API_SECRET,
  // cloud_name: "dby9tcuil",
  // api_key: "511759649588371",
  // api_secret: "_OTTEH8U82ubXpom7nKw8ibPgcQ",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  //   console.log(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
