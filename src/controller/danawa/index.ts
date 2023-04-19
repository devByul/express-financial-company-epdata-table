import ApiResponse from "../../utility/apiResponse";
import { IController } from "../../@interface/IController";
import ApiError from "../../utility/apiError";
import danawaService from "../../service/danawa";
import { IGetEpData } from "../../@interface/danawa/IGetData";

export default class danawaController {
  static comparisonDataByFinancialCompany: IController = async (req, res) => {
    try {
      const { brnNo, modlNo, trimNo, dtlTrimNo, prodType, period, jogun }: { [key: string]: any } = req.query;

      const param: IGetEpData = {
        in_brn_c_no_int: brnNo,
        in_modl_c_no_int: modlNo,
        in_trim_c_no_int: trimNo,
        in_dtl_trim_c_no_int: dtlTrimNo,
        in_prodType_char: prodType,
        in_period_c_no_int: period,
        in_jogun_int: jogun
      };
      const data = await danawaService.comparisonDataByFinancialCompany(param);

      ApiResponse.send(res, data);
    } catch (error: any) {
      console.log(error);
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };

  static getCarSelectItemAll: IController = async (req, res) => {
    try {
      const data = await danawaService.getCarSelectItemAll();

      ApiResponse.send(res, data);
    } catch (error: any) {
      console.log(error);
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
