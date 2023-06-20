import { luhnCheck, detectPaymentSystem } from "../js/validateFunctions";

export default class FormValidator {
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
