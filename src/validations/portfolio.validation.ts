import { checkSchema } from 'express-validator';

const checkPortfolioValidation = checkSchema({
  name: {
    notEmpty: true,
    escape: true,
    errorMessage: 'Enter Valid Name',
  },
});

export default checkPortfolioValidation;
