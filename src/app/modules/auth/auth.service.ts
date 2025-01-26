import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked === true) {
    throw new AppError(403, 'This user is blocked!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(403, 'Password do not matched');
  }

  // create token and send to the client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
