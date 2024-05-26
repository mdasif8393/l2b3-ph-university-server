export type TUser = {
  id: string;
  password: string;
  needsPassWordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
