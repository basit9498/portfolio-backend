import { checkSchema } from 'express-validator';
import { User } from '../models/user.model';
import { Request } from 'express';
import { isDate } from 'util/types';

// For All
export const getValidationParameters = (
  getParams: { type: string; include?: any }[],
  paramsList: any
) => {
  // v1
  let getData: any = [];
  Object.keys(paramsList).forEach((plf) => {
    if (getParams.find((gf) => gf?.type === plf)) {
      const getIndex = getParams.findIndex((gf) => gf?.type === plf);
      if (getIndex >= 0) {
        getData[plf] = { ...paramsList[plf], ...getParams[getIndex]?.include };
      } else {
        getData[plf] = paramsList[plf];
      }
    }
  });
  return getData;
};

export const validationParameters = {
  name: {
    notEmpty: {
      errorMessage: 'Please enter the name',
      bail: true,
    },
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage: 'Name Length Should be MIN:3 and MAX:30',
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Please enter the E-mail',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Please enter the valid E-mail',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Please enter the password',
      bail: true,
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage:
        'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8',
    },
  },
  conform_password: {
    notEmpty: {
      errorMessage: 'Please Enter Conform Password',
    },
    custom: {
      options: (value: string, { req }: { req: Request }) => {
        if (value !== req.body.password) {
          throw new Error('Conform Password is Not Matched !!!');
        }
        return true;
      },
    },
  },
  contact: {
    notEmpty: {
      errorMessage: 'Please enter the contact!!!',
    },
  },
  experience: {
    notEmpty: {
      errorMessage: 'Please enter the experience!!!',
    },
  },
  link: {
    notEmpty: {
      errorMessage: 'Please enter the URL!!!',
      bail: true,
    },
    isURL: {
      errorMessage: 'Please enter a valid URL!!!',
    },
  },
  user_id: {
    notEmpty: {
      errorMessage: 'Please enter the user_id!!!',
      bail: true,
    },
    isMongoId: {
      errorMessage: 'Invalid Id!!!',
    },
  },
  role: {
    notEmpty: {
      errorMessage: 'Please enter the role!!!',
      bail: true,
    },
  },
  detail: {
    notEmpty: {
      errorMessage: 'Please enter the detail!!!',
      bail: true,
    },
  },
  from_data: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Please enter the date!!!',
      bail: true,
    },
    isDate: true,
    errorMessage: 'Invalid date format',
  },
  to_date: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Please enter the date!!!',
      bail: true,
    },
    isDate: true,
    errorMessage: 'Invalid date format',
  },
};

const a = checkSchema({
  to_date: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Please enter the date!!!',
      bail: true,
    },
    isDate: true,
    errorMessage: 'Invalid date format',
    // custom: {
    //   options: (value) => {
    //     if (!isDate(value)) {
    //       throw new Error('Invalid Date');
    //     }
    //     return true;
    //   },
    // },
  },
});
