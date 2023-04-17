import multer, { FileFilterCallback } from "multer";
import { Definition } from "../config/definition";
import { logger } from "../config/logger";
import { Request } from "express";
import { DestinationCallback, FileNameCallback } from "src/@interface/IMulter";
import { existsSync, mkdirSync, rmSync, rmdir } from "fs";
import path from "path";
import { IMiddleware } from "../@interface/IMddleware";
import ApiError from "../utility/apiError";
import ApiResponse from "../utility/apiResponse";

const maxSize: number = Number(Definition.fileupload.maxsize);

/**
 * 정의한 mimetype과 동일한 파일만 필터링합니다.
 * @param fieldname rotue에서 정의한 필드이름입니다.
 * @param mimetype
 * @returns
 */
const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  if (fieldname === "nftFile") {
    if (mimetype === "image/gif") return true;
    if (mimetype === "image/png") return true;
    if (mimetype === "image/jpg") return true;
    if (mimetype === "image/jpeg") return true;
  }

  if (fieldname === "documentImg" || fieldname === "banner") {
    if (mimetype === "image/png") return true;
    if (mimetype === "image/jpg") return true;
    if (mimetype === "image/jpeg") return true;
  }

  if (fieldname === "csvFile") {
    if (mimetype === "text/csv") return true;
  }
  return false;
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (fileMimeTypeFileter(file.fieldname, file.mimetype)) {
    cb(null, true);
  } else {
    logger.error(`[FILE_UPLOAD_ERROR] The file type does not mactch - [${file.mimetype}] ${file.originalname}`);

    cb(null, false);
  }
};

const csvStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Definition.fileupload.csvDirname;
    mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const toSeconds = Math.floor(Date.now() / 1000);
    const customFilename: string = `${toSeconds}_${file.originalname}`;

    cb(null, customFilename);
  }
});

const bannerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, "../../bannerFile");
    mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const extention = file.mimetype.split("/")[1];
    const customName = `${Date.now()}.${extention}`;
    cb(null, customName);
  }
});

export const nftUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: maxSize },
  fileFilter
});

export const imgUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: maxSize },
  fileFilter
});

export const csvUpload = multer({
  storage: csvStorage,
  limits: { fieldSize: maxSize },
  fileFilter
});

export const bannerUpload = multer({
  storage: bannerStorage,
  limits: { fieldSize: maxSize },
  fileFilter
});

export const bannerDelete: IMiddleware = (req, res, next) => {
  try {
    const dir = path.join(__dirname, "../../bannerFile");
    console.log("dir", dir);
    rmSync(dir, { recursive: true, force: true });
    next();
  } catch (error) {
    console.error(error);
    ApiError.regist(error);
    ApiResponse.error(res, error);
  }
};
