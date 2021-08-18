export interface Errors {
  login: string | null;
  password: string[];
}

const rules = {
  loginLength: new RegExp('^(?=.{5,})'),
  passwordLength: new RegExp('^(?=.{8,})'),
  passwordCapitalLetter: new RegExp('^(?=.*[A-Z])'),
  passwordSmallLetter: new RegExp('^(?=.*[a-z])'),
  passwordNumber: new RegExp('^(?=.*[0-9])'),
};

export const validateUser = (login: string, password: string) => {
  let errors: Errors = {
    login: null,
    password: [],
  };
  if (!rules.loginLength.test(login)) {
    errors = {
      ...errors,
      login: `Login require at least 5 characters! Your login has ${login.length}`,
    };
  }

  if (!rules.passwordSmallLetter.test(password)) {
    errors = {
      ...errors,
      password: [...errors.password, 'Password require at least one small letter!'],
    };
  } else {
    errors = { ...errors, password: [...errors.password] };
  }

  if (!rules.passwordCapitalLetter.test(password)) {
    errors = {
      ...errors,
      password: [
        ...errors.password,
        'Password require at least one capital letter!',
      ],
    };
  } else {
    errors = { ...errors, password: [...errors.password] };
  }

  if (!rules.passwordNumber.test(password)) {
    errors = {
      ...errors,
      password: [...errors.password, 'Password require at least one number!'],
    };
  } else {
    errors = { ...errors, password: [...errors.password] };
  }

  if (!rules.passwordLength.test(password)) {
    errors = {
      ...errors,
      password: [
        ...errors.password,
        `Password require at least 8 characters! Your login has ${password.length}`,
      ],
    };
  } else {
    errors = { ...errors, password: [...errors.password] };
  }

  return errors;
};
