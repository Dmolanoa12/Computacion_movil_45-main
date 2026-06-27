import { Course } from '../../entities/course';
import { CourseRepositoryImpl } from '../../../data/repositories/CourseRepository';

const { update } = new CourseRepositoryImpl();

export const UpdateCourseUseCase = async (course: Course, token: string) => {
  return await update(course, token);
};
