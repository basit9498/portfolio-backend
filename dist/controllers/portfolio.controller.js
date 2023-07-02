"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortfolioService = exports.createPortfolioProject = exports.createPortfolioExperiences = exports.createPortfolioSocialLink = exports.deletePortfolioSkill = exports.updatePortfolioSkill = exports.createPortfolioSkill = exports.getPortfolio = exports.createPortfolio = void 0;
const responseSend_1 = require("../helpers/responseSend");
const portfolio_model_1 = require("../models/portfolio.model");
const searchingQuery_1 = __importDefault(require("../utils/searchingQuery"));
const bad_request_1 = require("../error/bad-request");
/**
 *Portfolio Info Section
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
const getPortfolio = async (req, res, next) => {
    try {
        const { id, page = 1, limit = 10, name = '' } = req.query;
        let parsedPage = parseInt(page.toString(), 10);
        let parsedLimit = parseInt(limit.toString(), 10);
        let portfolio = null;
        let data = null;
        if (id) {
            portfolio = await portfolio_model_1.PortfolioModelDB.findById(id);
            data = portfolio;
        }
        else {
            const searchingQueryResult = (0, searchingQuery_1.default)(['name', 'email'], req);
            const count = await portfolio_model_1.PortfolioModelDB.find(searchingQueryResult).countDocuments();
            if (parsedPage * parsedLimit > count) {
                parsedPage = 1;
                parsedLimit = count;
            }
            portfolio = await portfolio_model_1.PortfolioModelDB.find(searchingQueryResult)
                .limit(parsedLimit * 1)
                .skip((parsedPage - 1) * parsedLimit)
                .exec();
            // logic for next and previous link
            // example if we have 20 rec and as pr one page i will show the limit is 5 and each page
            // limit = 5  and current page = 1 and total count = 20
            let next = null, previous = null;
            const mainHostPath = `http://${req.headers.host}`;
            // next link generation
            if (parsedPage * parsedLimit < count) {
                next = `${mainHostPath}/portfolio?page=${parsedPage + 1}&limit=${parsedLimit}`;
            }
            // previous link generation
            if (parsedLimit < parsedLimit * parsedPage) {
                previous = `${mainHostPath}/portfolio?page=${parsedPage - 1}&limit=${parsedLimit}`;
            }
            data = {
                data: portfolio,
                total: count,
                next,
                previous,
            };
        }
        if (!portfolio) {
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded, null);
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Read, data);
    }
    catch (error) {
        next(error);
    }
};
exports.getPortfolio = getPortfolio;
/**
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
const updatePortfolioSkill = async (req, res, next) => {
    try {
        const { user_id, name, experience, visibility } = req.body;
        const { id } = req.params;
        const portfolio = await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id, 'skills._id': id }, {
            $set: {
                'skills.$[elem].name': name,
                'skills.$[elem].experience': experience,
                'skills.$[elem].visibility': visibility,
            },
        }, {
            arrayFilters: [{ 'elem._id': id }],
            returnOriginal: false,
        });
        if (portfolio.modifiedCount === 0) {
            throw new bad_request_1.BadRequest('Id not founded!!!');
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Updated);
    }
    catch (error) {
        next(error);
    }
};
exports.updatePortfolioSkill = updatePortfolioSkill;
const deletePortfolioSkill = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const { id } = req.params;
        const portfolio = await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $pull: {
                skills: { _id: id },
            },
        }, {
            returnOriginal: false,
        });
        if (portfolio.modifiedCount === 0) {
            throw new bad_request_1.BadRequest('Id not founded!!!');
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Delete);
    }
    catch (error) {
        next(error);
    }
};
exports.deletePortfolioSkill = deletePortfolioSkill;
/**
 *Social Section
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
// export const updatePortfolioSocialLink = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { user_id, name, link, visibility } = req.body;
//     const { id } = req.params;
//     const portfolio = await PortfolioModelDB.updateOne(
//       { _id: user_id, 'social_links._id': id },
//       {
//         $set: {
//           'social_links.$[elem].name': name,
//           'social_links.$[elem].link': link,
//           'social_links.$[elem].visibility': visibility,
//         },
//       },
//       {
//         arrayFilters: [{ 'elem._id': id }],
//         returnOriginal: false,
//       }
//     );
//     if (portfolio.modifiedCount === 0) {
//       throw new BadRequest('Id not founded!!!');
//     }
//     sendResponse(res, 200, MessageStatus.Updated);
//   } catch (error) {
//     next(error);
//   }
// };
// export const deletePortfolioSocialLink = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { user_id } = req.body;
//     const { id } = req.params;
//     const portfolio = await PortfolioModelDB.updateOne(
//       { _id: user_id },
//       {
//         $pull: {
//           social_links: { _id: id },
//         },
//       },
//       {
//         returnOriginal: false,
//       }
//     );
//     if (portfolio.modifiedCount === 0) {
//       throw new BadRequest('Id not founded!!!');
//     }
//     sendResponse(res, 200, MessageStatus.Delete);
//   } catch (error) {
//     next(error);
//   }
// };
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
/**
 *projects Section
 */
const createPortfolioProject = async (req, res, next) => {
    try {
        const { user_id, name, type, platform, link, visibility } = req.body;
        await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $push: { projects: { name, type, platform, link, visibility } },
        });
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created);
    }
    catch (error) {
        next(error);
    }
};
exports.createPortfolioProject = createPortfolioProject;
/**
 * Service Section
 */
const createPortfolioService = async (req, res, next) => {
    try {
        const { user_id, name, time_duration, detail, features, technology, visibility, } = req.body;
        await portfolio_model_1.PortfolioModelDB.updateOne({ _id: user_id }, {
            $push: {
                services: {
                    name,
                    time_duration,
                    detail,
                    features,
                    technology,
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
exports.createPortfolioService = createPortfolioService;
//# sourceMappingURL=portfolio.controller.js.map