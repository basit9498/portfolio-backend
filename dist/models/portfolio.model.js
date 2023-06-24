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
exports.PortfolioModelDB = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// SocialLinks Schema
const SocialLinkSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// Skills Schema
const SkillSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// Experiences Schema
const ExperienceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    from_data: {
        type: Date,
        required: true,
    },
    to_date: {
        type: Date,
        required: true,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// Projects Schema
const ProjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: [
        {
            type: String,
            required: true,
        },
    ],
    platform: [
        {
            type: String,
            required: true,
        },
    ],
    link: {
        type: String,
        required: true,
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// Services Schema
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
        },
    ],
    visibility: {
        type: Boolean,
        required: true,
        default: true,
    },
});
// PortfolioSchema
const PortfolioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    social_links: [SocialLinkSchema],
    skills: [SkillSchema],
    experiences: [ExperienceSchema],
    projects: [ProjectSchema],
    services: [ServiceSchema],
});
// Define Static Methods
PortfolioSchema.static('build', function build(portfolioAttr) {
    // return new PortfolioModelDB(portfolioAttr);
    return this.create(portfolioAttr);
});
exports.PortfolioModelDB = mongoose_1.default.model('Portfolio', PortfolioSchema);
//# sourceMappingURL=portfolio.model.js.map