import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerUserValidationSchema),
  UserControllers.registerUser,
);

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
