import React, { useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, ScrollView,
  StyleSheet, ActivityIndicator, Alert, Linking, ToastAndroid,
} from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import { MyColors } from '../../theme/AppTheme';

interface Props {
  token: string;
  isAdmin: boolean;
}

export const CoursesScreen = ({ token, isAdmin }: Props) => {
  const {
    courses, errorMessage, successMessage, loading,
    modalVisible, editingCourse, formValues,
    setModalVisible, setErrorMessage, setSuccessMessage,
    onChangeForm, openCreateModal, openEditModal, saveCourse, deleteCourse,
  } = useViewModel(token);

  useEffect(() => {
    if (errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      setErrorMessage('');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage !== '') {
      ToastAndroid.show(successMessage, ToastAndroid.SHORT);
      setSuccessMessage('');
    }
  }, [successMessage]);

  const confirmDelete = (id: number, title: string) => {
    Alert.alert(
      'Eliminar Curso',
      `¿Estás seguro de que deseas eliminar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteCourse(id) },
      ]
    );
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      ToastAndroid.show('No se pudo abrir el enlace', ToastAndroid.SHORT)
    );
  };

  const renderCourse = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.linkButton} onPress={() => openURL(item.url)}>
        <Text style={styles.linkButtonText}>🎓 Ir al curso gratuito</Text>
      </TouchableOpacity>
      {isAdmin && (
        <View style={styles.adminActions}>
          <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
            <Text style={styles.editButtonText}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id, item.title)}>
            <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Cursos Disponibles</Text>
        {isAdmin && (
          <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
            <Text style={styles.addButtonText}>+ Agregar</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={MyColors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCourse}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay cursos disponibles</Text>}
        />
      )}

      {/* Modal crear / editar */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingCourse ? '✏️ Editar Curso' : '➕ Nuevo Curso'}
              </Text>
              <CustomTextInput
                image={require('../../../../assets/description.png')}
                placeholder="Título del curso"
                keyboardType="default"
                property="title"
                onChangeText={onChangeForm}
                value={formValues.title}
              />
              <CustomTextInput
                image={require('../../../../assets/document.png')}
                placeholder="Descripción"
                keyboardType="default"
                property="description"
                onChangeText={onChangeForm}
                value={formValues.description}
              />
              <CustomTextInput
                image={require('../../../../assets/reloj.png')}
                placeholder="Duración (ej: 10 horas)"
                keyboardType="default"
                property="duration"
                onChangeText={onChangeForm}
                value={formValues.duration}
              />
              <CustomTextInput
                image={require('../../../../assets/email_purple.png')}
                placeholder="URL del curso"
                keyboardType="url"
                property="url"
                onChangeText={onChangeForm}
                value={formValues.url}
              />
              <CustomTextInput
                image={require('../../../../assets/image_add.png')}
                placeholder="URL de imagen (opcional)"
                keyboardType="url"
                property="image"
                onChangeText={onChangeForm}
                value={formValues.image || ''}
              />
              <View style={{ marginTop: 20 }}>
                <RoundedButton text={editingCourse ? 'ACTUALIZAR' : 'GUARDAR'} onPress={saveCourse} />
              </View>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: MyColors.primary, padding: 16,
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  addButton: { backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  addButtonText: { color: MyColors.primary, fontWeight: 'bold' },
  list: { padding: 12 },
  card: {
    backgroundColor: 'white', borderRadius: 12, padding: 16,
    marginBottom: 12, elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 8 },
  durationBadge: { backgroundColor: '#E8F4FD', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  durationText: { color: MyColors.primary, fontSize: 12, fontWeight: '600' },
  cardDescription: { color: '#666', fontSize: 14, lineHeight: 20, marginBottom: 12 },
  linkButton: {
    backgroundColor: MyColors.primary, borderRadius: 8,
    paddingVertical: 10, alignItems: 'center', marginBottom: 8,
  },
  linkButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  adminActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 4 },
  editButton: { backgroundColor: '#FFF3CD', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  editButtonText: { color: '#856404', fontWeight: '600', fontSize: 13 },
  deleteButton: { backgroundColor: '#F8D7DA', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  deleteButtonText: { color: '#721C24', fontWeight: '600', fontSize: 13 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: {
    backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: '90%',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8, textAlign: 'center' },
  cancelButton: { alignItems: 'center', marginTop: 16, paddingVertical: 12 },
  cancelButtonText: { color: '#999', fontSize: 16 },
});
