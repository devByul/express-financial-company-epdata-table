import { EOL } from "os";

interface nullAndEmptyStringCheckData {
  [key: string]: string;
}

interface nullAndEmptyStringCheckResult {
  status: boolean;
  empty: [...any];
}

export const nullAndEmptyStringCheck = (stringObj: nullAndEmptyStringCheckData) => {
  const result: nullAndEmptyStringCheckResult = {
    status: true,
    empty: []
  };

  Object.keys(stringObj).map(key => {
    if (stringObj[key] === null || stringObj[key] === undefined || stringObj[key].trim() === "") {
      result.status = false;
      result.empty.push(key);
    }
  });

  return result;
};

export const undefinedToEmptyString = (string: any): string => {
  return typeof string === "undefined" ? "" : string;
};
export const undefinedToEmptyNumber = (string: any): number => {
  return typeof string === "undefined" ? 0 : Number(string);
};

export const ifZeroLimit = (limit: string) => {
  return Number(limit) === 0 || Number.isNaN(Number(limit)) ? 10 : limit;
};

export const nullCheck = (string: any) => {
  return string.length !== 0 && string !== undefined;
};

export const randomStr = () => {
  return Math.random().toString(36).substring(2, 12);
};

export const getEol = (contents: string) => {
  const eolRegx = /\r\n|\n/g;
  const eolMatchArr: any = contents.match(eolRegx);

  const cntOfLF = eolMatchArr && eolMatchArr.filter((eol: string) => eol === "\n").length;
  const cntOfCRLF = eolMatchArr && eolMatchArr.length - cntOfLF;

  if (cntOfLF === cntOfCRLF) return EOL;

  return cntOfLF > cntOfCRLF ? "\n" : "\r\n";
};
