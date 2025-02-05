import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | any,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
