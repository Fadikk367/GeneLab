import authService from '../services/authService.js';


export const authUser = async (req, res, next) => {
  const authToken = req.get('Authorization');

  if(!authToken) {
    next(new Error("Unauthorized"));
  }

  const payload = await authService.authEmployee(authToken);
  req.user = payload;
  next();
}