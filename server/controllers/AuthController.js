import { Router } from 'express';
import authService from '../services/authService.js';

class AuthController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/login', this.login);
  }

  async login(req, res, next) {
    const credentials = req.body;
  
    try {
      const { authToken, user } = await authService.login(credentials);
      res.json({ authToken, user });
    } catch(err) {
      console.log(err);
      next(err);
    }
  }
}


export default new AuthController();