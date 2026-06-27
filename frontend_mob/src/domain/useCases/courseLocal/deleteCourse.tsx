// src/domain/useCases/courses/DeleteCourse.tsx  ← ARCHIVO NUEVO
import { CourseRepositoryImpl } from '../../../data/repositories/CourseRepository';

const { remove } = new CourseRepositoryImpl();

export const DeleteCourseUseCase = async (id: number, token: string) => {
  return await remove(id, token);
};
