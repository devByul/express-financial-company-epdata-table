/**
 *
 * @param digit 몇개의 난수를 생성 할 것인지 표기
 * @return 입력한 자릿수의 난수
 */
const digitCode = (digit: number): number => {
  const f = Number("1".padEnd(digit, "0"));
  const l = Number("9".padEnd(digit, "0"));

  const code = Math.floor(f + Math.random() * l);

  return code;
};

export { digitCode };
