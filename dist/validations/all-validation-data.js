"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationParameters = exports.getValidationParameters = void 0;
// For All
const getValidationParameters = (getParams, paramsList) => {
    // v1
    let getData = [];
    Object.keys(paramsList).forEach((plf) => {
        if (getParams.find((gf) => gf?.type === plf)) {
            const getIndex = getParams.findIndex((gf) => gf?.type === plf);
            if (getIndex >= 0) {
                getData[plf] = { ...paramsList[plf], ...getParams[getIndex]?.include };
            }
            else {
                getData[plf] = paramsList[plf];
            }
        }
    });
    return getData;
};
exports.getValidationParameters = getValidationParameters;
// Auth
exports.authValidationParameters = {
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
            errorMessage: 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8',
        },
    },
    conform_password: {
        notEmpty: {
            errorMessage: 'Please Enter Conform Password',
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Conform Password is Not Matched !!!');
                }
                return true;
            },
        },
    },
};
//# sourceMappingURL=all-validation-data.js.map