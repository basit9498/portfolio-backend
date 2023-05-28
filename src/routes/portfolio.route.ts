import express from 'express';
import * as PortfolioInfo from '../controllers/portfolio/info.controller';
import * as Portfolio from '../controllers/portfolio/portfolio.controller';
import * as PortfolioSkill from '../controllers/portfolio/skill.controller';
import * as PortfolioService from '../controllers/portfolio/service.controller';
import * as PortfolioProject from '../controllers/portfolio/project.controller';
import * as PortfolioExperience from '../controllers/portfolio/experience.controller';
import { isAuth } from '../middlewares/isAuth.middleare';
import checkPortfolioValidation from '../validations/portfolio.validation';
import { validationMiddleware } from '../middlewares/validation.middleware';

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
route.post(
  '/portfolio/info',
  checkPortfolioValidation,
  validationMiddleware,
  PortfolioInfo.createPortfolioInfo
);
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

// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * Service Controllers
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/service', PortfolioService.createPortfolioSerivce);
route.delete('/portfolio/service/:id', PortfolioService.deletePortfolioSerivce);
route.put('/portfolio/service/:id', PortfolioService.updatePortfolioSerivce);

/**
 * -----End-----
 */

// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * Project Controllers
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/project', PortfolioProject.createPortfolioProject);
route.delete('/portfolio/project/:id', PortfolioProject.deletePortfolioProject);
route.put('/portfolio/project/:id', PortfolioProject.updatePortfolioProject);

/**
 * -----End-----
 */

// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * Experience Controllers
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/experience',
  PortfolioExperience.createPortfolioExperience
);
route.delete(
  '/portfolio/experience/:id',
  PortfolioExperience.deletePortfolioExperience
);
route.put(
  '/portfolio/experience/:id',
  PortfolioExperience.updatePortfolioExperience
);

/**
 * -----End-----
 */

export { route as portfolioRoute };
