import { useState, useEffect } from 'react';
import { GetUserLocalUseCase} from '../../../domain/useCases/userLocal/GetUserLocal';

// Reutilizamos ApiDelivery directamente para operaciones de usuarios
// siguiendo el mismo patron que userController en el backend
import { ApiDelivery } from '../../../data/sources/remote/api/ApiDelivery';

export interface UserItem {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  image: string;
}

const UsersViewModel = (token: string) => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  const [formValues, setFormValues] = useState({
    name: '', lastname: '', email: '', phone: '', role: 'user', password: '',
  });

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await ApiDelivery.get('/users', {
        headers: { Authorization: token }
      });
      setUsers(response.data.data);
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message || 'Error al cargar usuarios');
    }
    setLoading(false);
  };

  const onChangeForm = (property: string, value: string) => {
    setFormValues({ ...formValues, [property]: value });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormValues({ name: '', lastname: '', email: '', phone: '', role: 'user', password: '' });
    setModalVisible(true);
  };

  const openEditModal = (user: UserItem) => {
    setEditingUser(user);
    setFormValues({
      name: user.name, lastname: user.lastname, email: user.email,
      phone: user.phone, role: user.role, password: '',
    });
    setModalVisible(true);
  };

  const saveUser = async () => {
    if (!formValues.name || !formValues.email) {
      setErrorMessage('Nombre y email son obligatorios');
      return;
    }
    setLoading(true);
    try {
      if (editingUser) {
        await ApiDelivery.put(`/users/${editingUser.id}`,
          { ...formValues, id: editingUser.id },
          { headers: { Authorization: token } }
        );
        setSuccessMessage('Usuario actualizado');
      } else {
        if (!formValues.password) { setErrorMessage('La contraseña es obligatoria'); setLoading(false); return; }
        await ApiDelivery.post('/users/create', formValues);
        setSuccessMessage('Usuario creado');
      }
      setModalVisible(false);
      fetchUsers();
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message || 'Error al guardar');
    }
    setLoading(false);
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      await ApiDelivery.delete(`/users/delete/${id}`, {
        headers: { Authorization: token }
      });
      setSuccessMessage('Usuario eliminado');
      fetchUsers();
    } catch (e: any) {
      setErrorMessage(e?.response?.data?.message || 'Error al eliminar');
    }
    setLoading(false);
  };

  return {
    users, errorMessage, successMessage, loading,
    modalVisible, editingUser, formValues,
    setModalVisible, setErrorMessage, setSuccessMessage,
    onChangeForm, openCreateModal, openEditModal, saveUser, deleteUser,
  };
};

export default UsersViewModel;
