// src/domain/useCases/courses/CreateCourse.tsx  ← ARCHIVO NUEVO
import { Course } from '../../entities/course';
import { CourseRepositoryImpl } from '../../../data/repositories/CourseRepository';

const { create } = new CourseRepositoryImpl();

export const CreateCourseUseCase = async (course: Course, token: string) => {
  return await create(course, token);
};
