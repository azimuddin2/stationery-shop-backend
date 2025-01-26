import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerUserValidationSchema),
  UserControllers.registerUser,
);

router.get('/', auth('admin'), UserControllers.getAllUsers);

router.get('/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
