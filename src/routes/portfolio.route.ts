import express from 'express';
import * as PortfolioInfo from '../controllers/portfolio/info.controller';
import * as Portfolio from '../controllers/portfolio/portfolio.controller';
import * as PortfolioSkill from '../controllers/portfolio/skill.controller';
import { isAuth } from '../middlewares/isAuth.middleare';
const route = express.Router();

/**
 * -----Start-----
 * Portfolio Controllers
 * Get,Delete
 * (Auth Required)
 */
route.get('/portfolio', Portfolio.getAllPortfolios);
route.delete('/portfolio/:id', Portfolio.deletePortfolio);

/**
 * -----End-----
 */

// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * PortfolioInfo Controllers
 * Create,Update
 * (Auth Required)
 */
route.post('/portfolio/info', PortfolioInfo.createPortfolioInfo);
route.put('/portfolio/info/:id', PortfolioInfo.updatePortfolioInfo);

/**
 * -----End-----
 */

// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * Skills Controllers
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/skill', PortfolioSkill.createSkillPortfolio);
route.delete('/portfolio/skill/:id', PortfolioSkill.deleteSkillPortfolio);
route.put('/portfolio/skill/:id', PortfolioSkill.updateSkillPortfolio);

/**
 * -----End-----
 */

export { route as portfolioRoute };
