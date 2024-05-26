import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // set manually generated id
  userData.id = '2030100001';

  // if password is not given then use default password
  userData.password = password || (config.default_password as string);

  // set student role in user data
  userData.role = 'student';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  // make result object an array so that we can get length
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    // here user is users's _id. connect student and user
    studentData.user = newUser._id; // reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
