import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

// const updateAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyId } = req.params;
//   const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
//     facultyId,
//     req.body,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty is updated successfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
