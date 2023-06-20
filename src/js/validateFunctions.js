export function luhnCheck(num) {
  let arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
}

export function detectPaymentSystem(cardNumber) {
  if (/^3[47]/.test(cardNumber)) {
    return "amexp";
  } else if (/^4/.test(cardNumber)) {
    return "visa";
  } else if (/^5[1-5]/.test(cardNumber)) {
    return "mastercard";
  } else if (/^22[0-9]{2}/.test(cardNumber)) {
    return "mir";
  } else if (/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(cardNumber)) {
    return "maestro";
  } else {
    return "Unknown";
  }
}
