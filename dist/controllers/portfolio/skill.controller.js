"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkillPortfolio = exports.deleteSkillPortfolio = exports.createSkillPortfolio = void 0;
const skill_model_1 = require("../../models/portfolio/skill.model");
const responseSend_1 = require("../../helpers/responseSend");
const bad_request_1 = require("../../error/bad-request");
// Create
const createSkillPortfolio = async (req, res, next) => {
    try {
        const { user_id, name, experience, visibility } = req.body;
        const skill = await skill_model_1.PortfolioSkillModel.build({
            user_id,
            name,
            experience,
            visibility,
        });
        if (!skill) {
            throw new bad_request_1.BadRequest();
        }
        await skill.save();
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created, skill);
    }
    catch (error) {
        next(error);
    }
};
exports.createSkillPortfolio = createSkillPortfolio;
// Delete
const deleteSkillPortfolio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const skill = await skill_model_1.PortfolioSkillModel.findByIdAndDelete(id);
        if (!skill) {
            throw new bad_request_1.BadRequest();
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Delete, skill);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkillPortfolio = deleteSkillPortfolio;
// Update
const updateSkillPortfolio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, experience, visibility } = req.body;
        const skill = await skill_model_1.PortfolioSkillModel.findByIdAndUpdate(id, {
            name,
            experience,
            visibility,
        }, {
            returnOriginal: false,
        });
        if (!skill) {
            throw new bad_request_1.BadRequest();
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Updated, skill);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSkillPortfolio = updateSkillPortfolio;
//# sourceMappingURL=skill.controller.js.map