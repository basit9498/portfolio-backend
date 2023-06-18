import { checkSchema } from 'express-validator';
import { User } from '../models/user.model';
import {
  getValidationParameters,
  authValidationParameters,
} from './all-validation-data';

export const authRegisterValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'email',
        include: {
          custom: {
            options: async (value: string) => {
              const checkingEmail = await User.findOne({ email: value });
              if (checkingEmail) {
                throw new Error('E-Mail is already in user!!!');
              }
              return true;
            },
          },
        },
      },
      {
        type: 'name',
      },
      {
        type: 'password',
      },
      {
        type: 'conform_password',
      },
    ],
    authValidationParameters
  ),
});

export const authLoginValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'email',
      },
      {
        type: 'password',
      },
    ],
    authValidationParameters
  ),
});

export const authLogoutValidation = checkSchema({
  id: {
    notEmpty: {
      errorMessage: 'Id is missing!!!!',
      bail: true,
    },
    isMongoId: {
      errorMessage: 'Please provide Valid Id',
    },
  },
});
