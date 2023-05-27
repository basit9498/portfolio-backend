import express from 'express';
import * as PortfolioInfo from '../controllers/portfolio/info.controller';
import * as Portfolio from '../controllers/portfolio/portfolio.controller';
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

export { route as portfolioRoute };
