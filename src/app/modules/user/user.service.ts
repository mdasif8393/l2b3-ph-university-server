/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given then use default password
  userData.password = password || (config.default_password as string);

  // set student role in user data
  userData.role = 'student';

  // find academic semseter info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // start a transaction session
  const session = await mongoose.startSession();
  try {
    // start transaction session
    session.startTransaction();
    // dynamically generate student id with help of academic semester
    userData.id = await generateStudentId(admissionSemester);

    // create a user(TRANSACTION 1)

    const newUser = await User.create([userData], { session }); // array

    // create a student
    // make result object an array so that we can get length
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to crate user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    // here user is users's _id. connect student and user
    payload.user = newUser[0]._id; // reference _id

    // create a student (Transaction 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    // abort transaction
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
