import { AxiosError } from 'axios';
import { Course } from '../../domain/entities/course';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { ApiDelivery } from '../sources/remote/api/ApiDelivery';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';

export class CourseRepositoryImpl implements CourseRepository {

  async getAll(token: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.get<ResponseApiDelivery>('/courses', {
        headers: { Authorization: token }
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const e = (error as AxiosError);
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async getById(id: number, token: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.get<ResponseApiDelivery>(`/courses/${id}`, {
        headers: { Authorization: token }
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const e = (error as AxiosError);
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async create(course: Course, token: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>('/courses/create', course, {
        headers: { Authorization: token }
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const e = (error as AxiosError);
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async update(course: Course, token: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.put<ResponseApiDelivery>(`/courses/${course.id}`, course, {
        headers: { Authorization: token }
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const e = (error as AxiosError);
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async remove(id: number, token: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.delete<ResponseApiDelivery>(`/courses/delete/${id}`, {
        headers: { Authorization: token }
      });
      return Promise.resolve(response.data);
    } catch (error) {
      const e = (error as AxiosError);
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }
}
