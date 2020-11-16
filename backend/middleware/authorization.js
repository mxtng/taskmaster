import jwt from 'jsonwebtoken';

export default (req, _, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.isAuth = true;
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
