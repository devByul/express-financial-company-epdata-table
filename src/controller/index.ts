import ApiResponse from "../utility/apiResponse";
import { IController } from "../@interface/IController";
import ApiError from "../utility/apiError";

export default class indexController {
  static indexPage: IController = async (req, res) => {
    try {
      ApiResponse.init(res);
    } catch (error: any) {
      console.log(error);
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
