// src/domain/useCases/courses/GetAllCourses.tsx  ← ARCHIVO NUEVO
import { CourseRepositoryImpl } from '../../../data/repositories/CourseRepository';

const { getAll } = new CourseRepositoryImpl();

export const GetAllCoursesUseCase = async (token: string) => {
  return await getAll(token);
};
