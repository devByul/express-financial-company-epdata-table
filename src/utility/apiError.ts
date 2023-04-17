import { StatusCodes } from "http-status-codes";

export default class ApiError extends Error {
  code: number | string;
  status: number;

  constructor(code: string | number, status: number, message: string) {
    super(message);
    this.code = code;
    this.status = status;
  }

  static regist = (error: any) => {
    // oauth2
    if (error.resultcode === "024") {
      error.code = "oAtuh2_NAVER";
      error.status = StatusCodes.BAD_REQUEST;
    }

    if (error.message === "data and hash arguments required") {
      error.code = "ARGUMENTS_ERROR";
      error.status = StatusCodes.BAD_REQUEST;
    }

    if (error.code === "OAUTH_NOT_FOUND") {
      error.message = "OATUH LOGIN FAIL";
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    // jsonwebtoken
    // https://github.com/auth0/node-jsonwebtoken/blob/74d5719bd03993fcf71e3b176621f133eb6138c0/verify.js#L75
    if (error.name === "TokenExpiredError") {
      error.code = "TOKEN_EXPIRE";
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = "Token is expire";
    }

    if (error.message === "jwt malformed") {
      error.code = "TOKEN_INVALID";
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = "Token is malformed token";
    }
    if (error.message === "invalid token") {
      error.code = "TOKEN_INVALID";
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = "Token is invalid token";
    }
    if (error.message === "invalid signature") {
      error.code = "TOKEN_SIGNATURE";
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = "Token is invalid signature";
    }
    if (error.message === "invalid algorithm") {
      error.code = "TOKEN_ALGORITHM";
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = "Token is invalid algorithm";
    }

    if (error.message === "data and salt arguments required") {
      error.code = "MISSING_ARGUMENT";
      error.status = StatusCodes.BAD_REQUEST;
    }

    // mysql2
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      error.message = error.sqlMessage;
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_PARSE_ERROR") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_WARN_DATA_OUT_OF_RANGE") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.message === "Cannot read properties of undefined (reading 'getConnection')") {
      error.code = "DATABASE_NOT_FOUND";
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_BAD_NULL_ERROR") {
      error.status = StatusCodes.BAD_REQUEST;
    }
    if (error.code === "ER_BAD_FIELD_ERROR") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_SP_WRONG_NO_OF_ARGS") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_SUBQUERY_NO_1_ROW") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.code === "ER_DUP_ENTRY") {
      error.status = StatusCodes.BAD_REQUEST;
    }
    // mysql custom Error
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    if (error.message === "This email already exists.") {
      error.code = "ER_DUP_ENTRY";
      error.status = StatusCodes.BAD_REQUEST;
    }

    // nodemailer
    if (error.code === "EENVELOPE") {
      error.status = StatusCodes.BAD_REQUEST;
    }
    if (error.message === "Error: No recipients defined") {
      error.status = StatusCodes.FORBIDDEN;
      error.code = "TO_EMAIL_IS_WRONG";
    }

    // fs
    if (error.code === "ENOENT") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
      error.message = "ENOENT: no such file or directory";
    }

    // express Response
    // sendFile
    if (error.message === "path must be absolute or specify root to res.sendFile") {
      error.code = "ER_DOWNLOAD_NO_FILE";
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    // proj4
    if (error.message === "coordinates must be finite numbers") {
      error.code = "ER_NOT_NUMBER";
      error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }

    // redis
    if (error.message === "Invalid argument type") {
      error.code = "REDIS";
      error.status = StatusCodes.BAD_REQUEST;
    }

    // ncloud ObjectStroage
    if (error.code === "NoSuchBucket") {
      error.status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return error;
  };
}
