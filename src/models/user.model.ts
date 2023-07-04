import { ecryptPassword } from '../helpers/encryptPassword';
import {
  UserAttrs,
  UserDocment,
  UserModel,
} from 'interfaces/models/user.model.interface';
import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateUserInput:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - conform_password
 *        properties:
 *            name:
 *              type: string
 *              default: Example Name
 *            email:
 *              type: string
 *              default: example@test.com
 *            password:
 *              type: string
 *              default: stringPassword@123
 *            conform_password:
 *              type: string
 *              default: stringPassword@123
 *    CreateUserResponse:
 *        type: object
 *        properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            id:
 *              type: string
 */
const UserSchema = new Schema<UserDocment, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify_account: {
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
      token: {
        type: String,
      },
    },
    account_status: {
      type: Boolean,
      required: true,
      default: false,
    },
    login_status: [
      {
        token: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      required: true,
      default: 'User',
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.login_status;
        delete ret.verify_account;
      },
    },
  }
);

/**
 * User Model Methods
 */
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const getHashPassword = await ecryptPassword(this.get('password'));
      if (typeof getHashPassword === 'string') {
        this.set('password', getHashPassword);
      }
    } catch (error) {
      throw new Error(
        'EcryptPassword Erorr Please Contact with Developer Team!!!'
      );
    }
  }

  next();
});

UserSchema.statics.build = (userAttrs: UserAttrs) => {
  return new User(userAttrs);
};

/**
 * User Documents Methods
 */

export const User = mongoose.model<UserDocment, UserModel>('User', UserSchema);
