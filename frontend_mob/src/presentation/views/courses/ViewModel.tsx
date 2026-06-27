import { useState, useEffect } from 'react';
import { Course } from '../../../domain/entities/course';
import { GetAllCoursesUseCase } from '../../../domain/useCases/courseLocal/GetAllCourses';
import { CreateCourseUseCase } from '../../../domain/useCases/courseLocal/createCourse';
import { UpdateCourseUseCase } from '../../../domain/useCases/courseLocal/updateCourse';
import { DeleteCourseUseCase } from '../../../domain/useCases/courseLocal/deleteCourse';

const CoursesViewModel = (token: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formValues, setFormValues] = useState<Course>({
    title: '',
    description: '',
    duration: '',
    url: '',
    image: '',
  });

  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    setLoading(true);
    const response = await GetAllCoursesUseCase(token);
    setLoading(false);
    if (response.success) {
      setCourses(response.data);
    } else {
      setErrorMessage(response.message);
    }
  };

  const onChangeForm = (property: string, value: string) => {
    setFormValues({ ...formValues, [property]: value });
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormValues({ title: '', description: '', duration: '', url: '', image: '' });
    setModalVisible(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormValues({ ...course });
    setModalVisible(true);
  };

  const saveCourse = async () => {
    if (!formValues.title || !formValues.url) {
      setErrorMessage('El título y la URL son obligatorios');
      return;
    }
    setLoading(true);
    let response;
    if (editingCourse) {
      response = await UpdateCourseUseCase({ ...formValues, id: editingCourse.id }, token);
    } else {
      response = await CreateCourseUseCase(formValues, token);
    }
    setLoading(false);
    if (response.success) {
      setSuccessMessage(editingCourse ? 'Curso actualizado' : 'Curso creado');
      setModalVisible(false);
      fetchCourses();
    } else {
      setErrorMessage(response.message);
    }
  };

  const deleteCourse = async (id: number) => {
    setLoading(true);
    const response = await DeleteCourseUseCase(id, token);
    setLoading(false);
    if (response.success) {
      setSuccessMessage('Curso eliminado');
      fetchCourses();
    } else {
      setErrorMessage(response.message);
    }
  };

  return {
    courses,
    errorMessage,
    successMessage,
    loading,
    modalVisible,
    editingCourse,
    formValues,
    setModalVisible,
    setErrorMessage,
    setSuccessMessage,
    onChangeForm,
    openCreateModal,
    openEditModal,
    saveCourse,
    deleteCourse,
    fetchCourses,
  };
};

export default CoursesViewModel;
