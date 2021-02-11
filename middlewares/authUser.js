import authService from '../services/authService.js';


export const authUser = async (req, res, next) => {
  const authToken = req.get('Authorization');

  if(!authToken) {
    res.status(403).json({ message: 'Unauthorized!' });
  } else {
    try {
      const employee = await authService.authEmployee(authToken);
      req.user = employee;
      next();
    } catch(err) {
      res.status(403).json({ message: 'Unauthorized!' });
    }
  }
}