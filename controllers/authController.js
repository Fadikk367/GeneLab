import authService from '../services/authService.js';


export const login = async (req, res, next) => {
  const credentials = req.body;

  const { authToken, user } = await authService.login(credentials);

  res.json({ authToken, user });
}


export default {
  login,
}