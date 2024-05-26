import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  //   validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
