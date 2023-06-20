import { luhnCheck, detectPaymentSystem } from "../validateFunctions";

test("the credit card belongs to the American Express payment system", () => {
  const result = detectPaymentSystem(379003746587648);
  expect(result).toBe("amexp");
});

test("the credit card belongs to the Visa payment system", () => {
  const result = detectPaymentSystem(4556206846693847);
  expect(result).toBe("visa");
});

test("the credit card belongs to the Mastercard payment system", () => {
  const result = detectPaymentSystem(5225771236543363);
  expect(result).toBe("mastercard");
});

test("the credit card belongs to the Мир payment system", () => {
  const result = detectPaymentSystem(2201382000000013);
  expect(result).toBe("mir");
});

test("the credit card belongs to the Maestro payment system", () => {
  const result = detectPaymentSystem(6763023984513891);
  expect(result).toBe("maestro");
});

test("payment system unknown", () => {
  const result = detectPaymentSystem(36629044056798);
  expect(result).toBe("Unknown");
});

test("checking a valid card using the Luhn method", () => {
  const result = luhnCheck(5225771236543363);
  expect(result).toBe(true);
});

test("checking a invalid card using the Luhn method", () => {
  const result = luhnCheck(135888888);
  expect(result).toBe(false);
});
