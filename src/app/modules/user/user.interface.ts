import { USER_ROLE } from './user.constant';

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  address?: string;
  isBlocked: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
