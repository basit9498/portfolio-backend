import { checkSchema } from 'express-validator';
import {
  validationParameters,
  getValidationParameters,
} from './all-validation-data';

export const portfolioCreateValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'name',
      },
      {
        type: 'email',
      },
      {
        type: 'contact',
      },
    ],
    validationParameters
  ),
});

export const portfolioSkillValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'name',
      },
      {
        type: 'experience',
      },
      {
        type: 'user_id',
      },
    ],
    validationParameters
  ),
});
export const portfolioSkillUpdateValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'id',
      },
    ],
    validationParameters
  ),
});
export const portfolioSkillDeleteValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'id',
      },
      {
        type: 'user_id',
      },
    ],
    validationParameters
  ),
});

export const portfolioSocialLinkValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'name',
      },
      {
        type: 'link',
      },
      {
        type: 'user_id',
      },
    ],
    validationParameters
  ),
});

export const portfolioExperienceValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'user_id',
      },
      {
        type: 'name',
      },
      {
        type: 'role',
      },
      {
        type: 'detail',
      },
      {
        type: 'from_data',
      },
      {
        type: 'to_date',
      },
    ],
    validationParameters
  ),
});

export const portfolioProjectValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'user_id',
      },
      {
        type: 'name',
      },
      {
        type: 'type',
      },
      {
        type: 'platform',
      },
      {
        type: 'link',
      },
    ],
    validationParameters
  ),
});

export const portfolioServiceValidation = checkSchema({
  ...getValidationParameters(
    [
      {
        type: 'user_id',
      },
      {
        type: 'name',
      },
      {
        type: 'time_duration',
      },
      {
        type: 'detail',
      },
      {
        type: 'features',
      },
      {
        type: 'technology',
      },
    ],
    validationParameters
  ),
  'technology.*.name': {
    notEmpty: {
      errorMessage: 'Please enter the technology name!!!',
      bail: true,
    },
    isString: true,
  },
  'technology.*.experience': {
    notEmpty: {
      errorMessage: 'Please enter the technology experience!!!',
      bail: true,
    },
    isString: true,
  },
});

export const portfolioGetValidation = checkSchema({
  id: {
    in: ['query'],
    optional: true,
    isMongoId: {
      errorMessage: 'Invalid Id!!!',
    },
  },
});
