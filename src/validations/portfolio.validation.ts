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

export const portfolioExperiencesValidation = checkSchema({
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
