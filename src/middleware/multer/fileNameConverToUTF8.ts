import { IMiddleware } from "../../@interface/IMddleware";
import ApiError from "../../utility/apiError";
import ApiResponse from "../../utility/apiResponse";

const fileNameConvertToUTF8: IMiddleware = (req, res, next) => {
  try {
    const file = req.file!;

    if (file) {
      const fileName = file.originalname;
      const convertName = Buffer.from(fileName, "latin1").toString("utf8");
      file.originalname = convertName;
    } else {
      const fileList = req.files! as { [fieldname: string]: Express.Multer.File[] };
      const fileListKey = Object.keys(fileList);

      fileListKey.map((key: string) => {
        fileList[key].map(file => {
          const fileName = file.originalname;
          const convertName = Buffer.from(fileName, "latin1").toString("utf8");
          file.originalname = convertName;
        });
      });
    }

    next();
  } catch (error) {
    console.error(error);
    ApiError.regist(error);
    ApiResponse.error(res, error);
  }
};

export { fileNameConvertToUTF8 };
