    import React, { useEffect } from 'react';
    import { Text, View, Image, ScrollView, ToastAndroid } from 'react-native';
    import { RoundedButton } from '../../components/RoundedButton';
    import { CustomTextInput } from '../../components/CustomTextInput';
    import useViewModel from './ViewModel';
    import styles from './Styles';

    export const RegisterScreen = () => {

      const { name, lastname, phone, email, password, confirmPassword, errorMessage, onChange, register } = useViewModel();

      useEffect(() => {
        if (errorMessage !== '')
          ToastAndroid.show(errorMessage, ToastAndroid.LONG)
      }, [errorMessage]);

      return (
        <View style={styles.container}>
          <Image
            source={require('../../../../assets/curso_online_sin_boton.png')}
            style={styles.imageBackground}
          />
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../../assets/cursos.png')}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>FOOD APP</Text>
          </View>
          <View style={styles.form}>
            <ScrollView>
              <Text style={styles.formText}>REGÍSTRATE</Text>
              <CustomTextInput
                image={require('../../../../assets/nombres_user.png')}
                placeholder='Nombres'
                keyboardType='default'
                property='name'
                onChangeText={onChange}
                value={name}
              />
              <CustomTextInput
                image={require('../../../../assets/apellido.png')}
                placeholder='Apellidos'
                keyboardType='default'
                property='lastname'
                onChangeText={onChange}
                value={lastname}
              />
              <CustomTextInput
                image={require('../../../../assets/email_purple.png')}
                placeholder='Correo Electrónico'
                keyboardType='email-address'
                property='email'
                onChangeText={onChange}
                value={email}
              />
              <CustomTextInput
                image={require('../../../../assets/phone_purple.png')}
                placeholder='Teléfono'
                keyboardType='numeric'
                property='phone'
                onChangeText={onChange}
                value={phone}
              />
              <CustomTextInput
                image={require('../../../../assets/candado.png')}
                placeholder='Contraseña'
                keyboardType='default'
                property='password'
                onChangeText={onChange}
                value={password}
                secureTextEntry={true}
              />
              <CustomTextInput
                image={require('../../../../assets/candado2.png')}
                placeholder='Confirmar Contraseña'
                keyboardType='default'
                property='confirmPassword'
                onChangeText={onChange}
                value={confirmPassword}
                secureTextEntry={true}
              />
              <View style={{ marginTop: 10 }}>
                <RoundedButton text='CONFIRMAR' onPress={() => register()} />
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }