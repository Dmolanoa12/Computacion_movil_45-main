import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';
import { CoursesScreen } from '../../courses/Courses';
import { UsersScreen } from '../../users/Users';
import { MyColors } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> {}

export const ProfileInfoScreen = ({ navigation }: Props) => {
  const { removeSession, user } = useViewModel();
  const [activeTab, setActiveTab] = useState<'courses' | 'users'>('courses');

  // Esperar a que el usuario cargue del AsyncStorage
  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={MyColors.primary} />
      </SafeAreaView>
    );
  }

  const isAdmin = user.role === 'admin';
  const token = user.session_token || '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Hola, {user.name} 👋</Text>
          <Text style={styles.roleText}>Rol: {user.role}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => { removeSession(); navigation.navigate('HomeScreen'); }}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'courses' && styles.tabActive]}
          onPress={() => setActiveTab('courses')}
        >
          <Text style={[styles.tabText, activeTab === 'courses' && styles.tabTextActive]}>
            📚 Cursos
          </Text>
        </TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'users' && styles.tabActive]}
            onPress={() => setActiveTab('users')}
          >
            <Text style={[styles.tabText, activeTab === 'users' && styles.tabTextActive]}>
              👥 Usuarios
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {activeTab === 'courses' && <CoursesScreen token={token} isAdmin={isAdmin} />}
        {activeTab === 'users' && isAdmin && <UsersScreen token={token} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: MyColors.primary, paddingHorizontal: 16, paddingVertical: 12,
  },
  welcomeText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  roleText: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  logoutText: { color: 'white', fontWeight: '600', fontSize: 13 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: MyColors.primary },
  tabText: { color: '#999', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: MyColors.primary },
  content: { flex: 1 },
});