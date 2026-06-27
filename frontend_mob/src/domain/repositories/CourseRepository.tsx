import { Course } from '../entities/course';
import { ResponseApiDelivery } from '../../data/sources/remote/models/ResponseApiDelivery';

export interface CourseRepository {
  getAll(token: string): Promise<ResponseApiDelivery>;
  getById(id: number, token: string): Promise<ResponseApiDelivery>;
  create(course: Course, token: string): Promise<ResponseApiDelivery>;
  update(course: Course, token: string): Promise<ResponseApiDelivery>;
  remove(id: number, token: string): Promise<ResponseApiDelivery>;
}
