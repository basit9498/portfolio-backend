"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortfolioExperiences = exports.createPortfolioSocialLink = exports.createPortfolioSkill = exports.createPortfolio = void 0;
const responseSend_1 = require("../helpers/responseSend");
const portfolio_model_1 = require("../models/portfolio.model");
/**
 *Portfilio Info Section
 */
const createPortfolio = async (req, res, next) => {
    try {
        const { name, email, contact, social_links } = req.body;
        const portfolio = await portfolio_model_1.PortfolioModelDB.build({
            name,
            email,
            contact,
            social_links,
        });
        console.log('portfolio', portfolio);
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created, portfolio);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolio = createPortfolio;
/**
 *
 *Skill Section
 */
const createPortfolioSkill = async (req, res, next) => {
    try {
        const { user_id, name, experience, visibility } = req.body;
        await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $push: { skills: { name, experience, visibility } },
        }, {
            returnOriginal: false,
        });
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioSkill = createPortfolioSkill;
/**
 *Soical Section
 */
const createPortfolioSocialLink = async (req, res, next) => {
    try {
        const { user_id, name, link, visibility } = req.body;
        await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $push: {
                social_links: { name, link, visibility },
            },
        });
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioSocialLink = createPortfolioSocialLink;
/**
 *Experiences Section
 */
const createPortfolioExperiences = async (req, res, next) => {
    try {
        const { user_id, name, role, detail, from_data, to_date, visibility } = req.body;
        await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $push: {
                experiences: {
                    name,
                    role,
                    detail,
                    from_data,
                    to_date,
                    visibility,
                },
            },
        });
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioExperiences = createPortfolioExperiences;
//# sourceMappingURL=portfolio.controller.js.map