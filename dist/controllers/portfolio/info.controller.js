"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePortfolioInfo = exports.createPortfolioInfo = void 0;
const info_model_1 = require("../../models/portfolio/info.model");
// Create
const createPortfolioInfo = async (req, res, next) => {
    try {
        const { name, email, contact, social_links } = req.body;
        const portfolio = await info_model_1.PortfolioInfo.build({
            name,
            email,
            contact,
            social_links,
        });
        await portfolio.save();
        res.json({ message: 'created_portfoilio_info', data: portfolio });
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioInfo = createPortfolioInfo;
// Update
const updatePortfolioInfo = async (req, res, next) => {
    // Validation
    const id = req.params.id;
    const { name, contact, social_links } = req.body;
    try {
        const portfolio = await info_model_1.PortfolioInfo.findByIdAndUpdate(id, { name, contact, social_links }, { returnOriginal: false });
        await portfolio?.save();
        res.json({ message: 'Updated_portfoilio_info', data: portfolio });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
};
exports.updatePortfolioInfo = updatePortfolioInfo;
//# sourceMappingURL=info.controller.js.map