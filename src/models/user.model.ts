import { ecryptPassword } from '../helpers/encryptPassword';
import {
  ActiveStatus,
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
    active_status: {
      type: String,
      required: true,
      enum: ['ONLINE', 'OFFLINE'],
      default: 'OFFLINE',
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
    avatar: {
      type: String,
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

UserSchema.statics.updateActiveStatus = async (
  id: string,
  status: ActiveStatus
) => {
  const userStatus = await User.updateOne(
    { _id: id },
    {
      $set: { active_status: status },
    }
  );

  if (userStatus.modifiedCount === 0) {
    return false;
  }
  return true;
};

/**
 * User Documents Methods
 */

export const User = mongoose.model<UserDocment, UserModel>('User', UserSchema);
