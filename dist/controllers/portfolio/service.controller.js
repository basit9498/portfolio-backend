"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePortfolioSerivce = exports.deletePortfolioSerivce = exports.createPortfolioSerivce = void 0;
const service_model_1 = require("../../models/portfolio/service.model");
const responseSend_1 = require("../../helpers/responseSend");
const bad_request_1 = require("../../error/bad-request");
// create
const createPortfolioSerivce = async (req, res, next) => {
    try {
        const { user_id, name, time_duration, detail, features, technology } = req.body;
        const service = await service_model_1.PortfolioServiceModel.build({
            user_id,
            name,
            time_duration,
            detail,
            features,
            technology,
        });
        await service.save();
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created, service);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioSerivce = createPortfolioSerivce;
// Delte
const deletePortfolioSerivce = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await service_model_1.PortfolioServiceModel.findByIdAndDelete(id);
        if (!service) {
            throw new bad_request_1.BadRequest();
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Delete, service);
    }
    catch (error) {
        next(error);
    }
};
exports.deletePortfolioSerivce = deletePortfolioSerivce;
// update
const updatePortfolioSerivce = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, time_duration, detail, features, technology } = req.body;
        const service = await service_model_1.PortfolioServiceModel.findByIdAndUpdate(id, {
            name,
            time_duration,
            detail,
            features,
            technology,
        }, {
            returnOriginal: false,
        });
        if (!service) {
            throw new bad_request_1.BadRequest();
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Updated, service);
    }
    catch (error) {
        next(error);
    }
};
exports.updatePortfolioSerivce = updatePortfolioSerivce;
//# sourceMappingURL=service.controller.js.map