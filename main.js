/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validateFunctions.js
function luhnCheck(num) {
  let arr = (num + "").split("").reverse().map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => i % 2 !== 0 ? acc + val : acc + val * 2 % 9 || 9, 0);
  sum += lastDigit;
  return sum % 10 === 0;
}
function detectPaymentSystem(cardNumber) {
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
;// CONCATENATED MODULE: ./src/components/FormValidator.js

class FormValidator {
  constructor(element) {
    if (typeof element !== "string") {
      this.element = element;
    } else {
      this.element = document.querySelectorAll(element);
    }
    this.formValidator = this.element[0].querySelector(".form-validator");
    this.formInput = this.element[0].querySelector(".form-input");
    this.tooltip = this.element[0].querySelector(".tooltip");
    this.cards = document.querySelectorAll(".card");
    this.onSubmit = this.onSubmit.bind(this);
    this.toValidate = this.toValidate.bind(this);
    this.toResult = this.toResult.bind(this);
    this.formValidator.addEventListener("submit", this.onSubmit);
  }
  onSubmit(e) {
    e.preventDefault();
    for (const item of this.cards) {
      item.classList.remove("inactive-card");
    }
    this.toValidate();
  }
  toValidate() {
    if (this.tooltip.classList.contains("tooltip-active")) {
      this.tooltip.classList.remove("tooltip-active");
    }
    if (luhnCheck(this.formInput.value) === false) {
      this.tooltip.classList.add("tooltip-active");
      return;
    }
    this.toResult(detectPaymentSystem(this.formInput.value));
  }
  toResult(result) {
    for (const item of this.cards) {
      if (!item.classList.contains(result)) {
        item.classList.add("inactive-card");
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const formValidator = new FormValidator(".form-group");
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map