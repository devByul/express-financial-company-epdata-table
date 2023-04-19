export interface IGetEpData {
  in_brn_c_no_int: number;
  in_modl_c_no_int: number;
  in_trim_c_no_int: number;
  in_dtl_trim_c_no_int: number;
  in_prodType_char: "L" | "R" | "I";
  in_period_c_no_int: 36 | 48 | 60;
  in_jogun_int: 1 | 2 | 3;
}
