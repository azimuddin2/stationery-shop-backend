import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { verifyToken } from '../utils/verifyToken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    const decoded = verifyToken(token, config.jwt_access_secret as string);

    const { email, role, iat } = decoded;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(404, 'This user is not found!');
    }

    const isBlocked = user?.isBlocked;
    if (isBlocked === true) {
      throw new AppError(403, 'This user is blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
