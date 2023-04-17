import { Response } from "express";
import { logger } from "../config/logger";
import { StatusCodes } from "http-status-codes";
import { Definition } from "../config/definition";

export default class ApiResponse {
  static init = (res: Response) => {
    res.send("HAuto Api Server");
  };

  static end = (res: Response, data: any = null) => {
    res.end(data);
  };

  static send = (res: Response, data: any = null) => {
    res.send(data);
  };

  static result = (res: Response, status: number = 200, data: any = null) => {
    res.status(status);

    res.json({
      success: true,
      ...data
    });
  };

  // static download = (res: Response, saveName: string, originalName: string) => {
  //   const path = Config.fileupload.formFileDirname + saveName;

  //   res.download(path, originalName);
  // };

  static status = (res: Response, status: number) => {
    res.status(status).end();
  };

  static redirect = (res: Response, endpoint: string, query: string) => {
    res.redirect(endpoint + query);
  };

  static error = (res: Response, error: any) => {
    logger.error(`[${error.code}] ${error.status} ${error.message} ${error.sql ? error.sql : null}`);

    if (Definition.server.mode === Definition.server.modeDev) {
      console.trace(`${error}`);
    }

    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: error.code,
      message: error.message
    });
  };
}
