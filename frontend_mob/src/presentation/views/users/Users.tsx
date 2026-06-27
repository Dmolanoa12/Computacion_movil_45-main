import React, { useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Modal, ScrollView,
  StyleSheet, ActivityIndicator, Alert, ToastAndroid,
} from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import { MyColors } from '../../theme/AppTheme';

interface Props {
  token: string;
}

const ROLES = ['admin', 'seller', 'customer', 'user'];

export const UsersScreen = ({ token }: Props) => {
  const {
    users, errorMessage, successMessage, loading,
    modalVisible, editingUser, formValues,
    setModalVisible, setErrorMessage, setSuccessMessage,
    onChangeForm, openCreateModal, openEditModal, saveUser, deleteUser,
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

  const confirmDelete = (id: number, name: string) => {
    Alert.alert('Eliminar Usuario', `¿Eliminar a "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => deleteUser(id) },
    ]);
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return '#dc3545';
      case 'seller': return '#fd7e14';
      case 'customer': return '#198754';
      default: return '#6c757d';
    }
  };

  const renderUser = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name} {item.lastname}</Text>
          <Text style={styles.cardEmail}>{item.email}</Text>
          <Text style={styles.cardPhone}>{item.phone}</Text>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: roleBadgeColor(item.role) }]}>
          <Text style={styles.roleText}>{item.role}</Text>
        </View>
      </View>
      <View style={styles.adminActions}>
        <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
          <Text style={styles.editButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id, item.name)}>
          <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👥 Usuarios</Text>
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={MyColors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUser}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay usuarios</Text>}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingUser ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}
              </Text>
              <CustomTextInput
                image={require('../../../../assets/nombres_user.png')}
                placeholder="Nombre"
                keyboardType="default"
                property="name"
                onChangeText={onChangeForm}
                value={formValues.name}
              />
              <CustomTextInput
                image={require('../../../../assets/apellido.png')}
                placeholder="Apellido"
                keyboardType="default"
                property="lastname"
                onChangeText={onChangeForm}
                value={formValues.lastname}
              />
              <CustomTextInput
                image={require('../../../../assets/email.png')}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                property="email"
                onChangeText={onChangeForm}
                value={formValues.email}
              />
              <CustomTextInput
                image={require('../../../../assets/phone.png')}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                property="phone"
                onChangeText={onChangeForm}
                value={formValues.phone}
              />
              {!editingUser && (
                <CustomTextInput
                  image={require('../../../../assets/candado.png')}
                  placeholder="Contraseña"
                  keyboardType="default"
                  property="password"
                  onChangeText={onChangeForm}
                  value={formValues.password}
                  secureTextEntry
                />
              )}
              {/* Selector de rol */}
              <Text style={styles.roleLabel}>Rol:</Text>
              <View style={styles.roleSelector}>
                {ROLES.map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[styles.roleOption, formValues.role === role && styles.roleOptionActive]}
                    onPress={() => onChangeForm('role', role)}
                  >
                    <Text style={[styles.roleOptionText, formValues.role === role && styles.roleOptionTextActive]}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginTop: 20 }}>
                <RoundedButton text={editingUser ? 'ACTUALIZAR' : 'GUARDAR'} onPress={saveUser} />
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
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: MyColors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  cardInfo: { flex: 1 },
  cardName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  cardEmail: { color: '#666', fontSize: 13 },
  cardPhone: { color: '#999', fontSize: 12 },
  roleBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  roleText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  adminActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
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
  roleLabel: { marginTop: 20, marginBottom: 8, fontWeight: '600', color: '#555' },
  roleSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  roleOption: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  roleOptionActive: { backgroundColor: MyColors.primary, borderColor: MyColors.primary },
  roleOptionText: { color: '#555' },
  roleOptionTextActive: { color: 'white', fontWeight: 'bold' },
  cancelButton: { alignItems: 'center', marginTop: 16, paddingVertical: 12 },
  cancelButtonText: { color: '#999', fontSize: 16 },
});
