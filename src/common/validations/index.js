class Validation {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  validate() {
    return '';
  }
}

class RequiredValidation extends Validation {
  constructor(errorMessage) {
    super(errorMessage);
  }
  validate(val) {
    return val ? '' : this.errorMessage;
  }
}
class EmailFormatValidation extends Validation {
  constructor(errorMessage, regex) {
    super(errorMessage);
    this.regex = regex;
  }
  validate(val) {
    return this.regex.test(val) ? '' : this.errorMessage;
  }
}
class MinLengthValidation extends Validation {
  constructor(errorMessage, length) {
    super(errorMessage);
    this.length = length;
  }
  validate(val) {
    return val.length >= this.length ? '' : this.errorMessage;
  }
}
class PasswordFormatValidation extends Validation {
  constructor(errorMessage, regex) {
    super(errorMessage);
    this.regex = regex;
  }
  validate(val) {
    return this.regex.test(val) ? '' : this.errorMessage;
  }
}

class PasswordConfirmValidation extends Validation {
  constructor(errorMessage, password) {
    super(errorMessage);
    this._password = password;
  }

  set password(newPassword){
    this._password = newPassword
  }

  validate(val) {
    return this._password === val ? '' : this.errorMessage;
  }
}

class NumericValidation extends Validation {
  constructor(errorMessage) {
    super(errorMessage);
  }
  validate(val) {
    return !isNaN(val) ? '' : this.errorMessage;
  }
}

export {
  RequiredValidation,
  EmailFormatValidation,
  MinLengthValidation,
  PasswordFormatValidation,
  PasswordConfirmValidation,
  NumericValidation,
};
