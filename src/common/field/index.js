class Field {
  constructor(label, type, placeholder) {
    this.label = label;
    this.type = type;
    this.placeholder = placeholder;
    this._value = '';
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }
}

class ValidationField extends Field {
  constructor(label, type, placeholder, validationList) {
    super(label, type, placeholder);
    this.validationList = validationList;
  }

  get errorMessage() {
    const firstError = this.validationList.find((validation) => {
      const error = validation.validate(this.value);
      return error;
    });

    return firstError ? firstError.errorMessage : '';
  }
}

export { Field, ValidationField };
