"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const encryptPassword_1 = require("../helpers/encryptPassword");
const mongoose_1 = __importStar(require("mongoose"));
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
const UserSchema = new mongoose_1.Schema({
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
}, {
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
});
/**
 * User Model Methods
 */
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const getHashPassword = await (0, encryptPassword_1.ecryptPassword)(this.get('password'));
            if (typeof getHashPassword === 'string') {
                this.set('password', getHashPassword);
            }
        }
        catch (error) {
            throw new Error('EcryptPassword Erorr Please Contact with Developer Team!!!');
        }
    }
    next();
});
UserSchema.statics.build = (userAttrs) => {
    return new exports.User(userAttrs);
};
UserSchema.statics.updateActiveStatus = async (id, status) => {
    const userStatus = await exports.User.updateOne({ _id: id }, {
        $set: { active_status: status },
    });
    if (userStatus.modifiedCount === 0) {
        return false;
    }
    return true;
};
/**
 * User Documents Methods
 */
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map