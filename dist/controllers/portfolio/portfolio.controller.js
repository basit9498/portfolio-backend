"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolio = exports.getAllPortfolios = void 0;
const info_model_1 = require("../../models/portfolio/info.model");
const CustomError_1 = require("../../error/CustomError");
// Get All Portfolio
const getAllPortfolios = async (req, res, next) => {
    try {
        const portfolio = await info_model_1.PortfolioInfo.find();
        res.json({ message: 'all_portfoilio_info', data: portfolio });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
};
exports.getAllPortfolios = getAllPortfolios;
// Delete Portfolio
const deletePortfolio = async (req, res, next) => {
    const id = req.params.id;
    try {
        const portfolio = await info_model_1.PortfolioInfo.findByIdAndDelete(id);
        if (!portfolio) {
            // throw new Error('Id not Founded !!!');
            throw new CustomError_1.CustomError("'Id not Founded !!!'", 404);
        }
        res.json({ message: 'deleted_portfoilio_info', data: portfolio });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePortfolio = deletePortfolio;
//# sourceMappingURL=portfolio.controller.js.map