import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'littlesecretswetellourselves',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '2d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer xxxxxx
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'littlesecretswetellourselves',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalide Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
