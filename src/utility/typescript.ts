/**
 * type 혹은 interface을 enum으로 정의하여 입력 객체와 비교하여 올바른 key값을 가지고 있는지 확인 하는 함수입니다.
 * @param object
 * @param typescriptTypeEnum
 * @example
 * interface IHuman {
 *      age:number;
 *      name:string;
 * }
 * enum EHuman {
 *      age: 0,
 *      name: ""
 * }
 * const humanTrue = {
 *      age: 20,
 *      name: "Kino"
 * }
 * const humanFalse = {
 *      name: "Kino"
 * }
 * console.log(typescriptCheckType(humanTrue,EHuman);) // true
 * console.log(typescriptCheckType(humanFalse,EHuman);) // false
 */
export const typescriptCheckType = (object: object, typescriptTypeEnum: any) => {
  for (let key of Object.keys(typescriptTypeEnum)) {
    if (!(key in object)) {
      return false;
    }
  }
  return true;
};
