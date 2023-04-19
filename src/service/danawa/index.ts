import { IGetEpData } from "../../@interface/danawa/IGetData";
import { Definition } from "../../config/definition";
import DB from "../../utility/dbUtil";

const { name: dbName } = Definition.mysql;
interface ICarSelectItem {
  [key: string]: ICarSelectItemProps[];
}
interface ICarSelectItemProps {
  BRN_C_NO?: string;
  BRN_C_NM?: string;
  MODL_C_NO?: string;
  MODL_C_NM?: string;
  TRIM_C_NO?: string;
  TRIM_C_NM?: string;
  DTL_TRIM_C_NO?: string;
  DTL_TRIM_C_NM?: string;
}

interface ITest {
  brnNm: string;
  jogun: string;
  prodType: string;
  carNm: string;
  corpName: string;
  corpCpde: string;
  period: string;
  residualAmount: string;
  price: string;
  ratio: string;
  EP_DATETIME: string;
}

interface ITest2 extends ITest {
  carNo: string;
}

export default class danawaService {
  static comparisonDataByFinancialCompany = async ({
    in_brn_c_no_int,
    in_modl_c_no_int,
    in_trim_c_no_int,
    in_dtl_trim_c_no_int,
    in_prodType_char,
    in_period_c_no_int,
    in_jogun_int
  }: IGetEpData) => {
    const sql = "CALL spGetComparisonCapitalData(?,?,?,?,?,?,?);";
    const result = await DB.execute(dbName, sql, [
      in_brn_c_no_int,
      in_modl_c_no_int,
      in_trim_c_no_int,
      in_dtl_trim_c_no_int,
      in_prodType_char,
      in_period_c_no_int,
      in_jogun_int
    ]);

    return result[0];
  };

  static getCarSelectItemAll = async () => {
    const sql = "call spGetCarSelectItemAll();";
    const result = await DB.execute(dbName, sql, []);

    let brand: ICarSelectItem = {};
    let model: ICarSelectItem = {};
    let trim: ICarSelectItem = {};
    let dtlTrim: ICarSelectItem = {};

    result.map((item: any, index: number) => {
      switch (index) {
        case 0:
          item.map((data: any) => {
            const { idx, BRN_C_NO, BRN_C_NM } = data;
            if (!brand[idx]) brand[idx] = new Array();
            brand[idx].push({ BRN_C_NO, BRN_C_NM });
          });
          break;
        case 1:
          item.map((data: any) => {
            const { idx, MODL_C_NO, MODL_C_NM } = data;
            if (!model[idx]) model[idx] = new Array();
            model[idx].push({ MODL_C_NO, MODL_C_NM });
          });
          break;
        case 2:
          item.map((data: any) => {
            const { idx, TRIM_C_NO, TRIM_C_NM } = data;
            if (!trim[idx]) trim[idx] = new Array();
            trim[idx].push({ TRIM_C_NO, TRIM_C_NM });
          });
          break;
        case 3:
          item.map((data: any) => {
            const { idx, DTL_TRIM_C_NO, DTL_TRIM_C_NM } = data;
            if (!dtlTrim[idx]) dtlTrim[idx] = new Array();
            dtlTrim[idx].push({ DTL_TRIM_C_NO, DTL_TRIM_C_NM });
          });
          break;
      }
    });

    return { brand, model, trim, dtlTrim };
  };
}
