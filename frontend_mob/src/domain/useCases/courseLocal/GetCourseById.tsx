import { CourseRepositoryImpl } from '../../../data/repositories/CourseRepository';

const { getById } = new CourseRepositoryImpl();

export const GetCourseByIdUseCase = async (id: number, token: string) => {
  return await getById(id, token);
};
