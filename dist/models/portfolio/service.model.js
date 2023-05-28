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
exports.PortfolioServiceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ServiceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    time_duration: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Portfolio',
    },
    technology: [
        {
            name: {
                type: String,
                required: true,
            },
            experience: {
                type: String,
                required: true,
            },
            visabilty: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
    ],
});
ServiceSchema.statics.build = (serviceAttr) => {
    return new exports.PortfolioServiceModel(serviceAttr);
};
exports.PortfolioServiceModel = mongoose_1.default.model('Portfolio_Service', ServiceSchema);
//# sourceMappingURL=service.model.js.map