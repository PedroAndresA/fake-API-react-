//RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  //Declara cuatro estadosutilizando el hook usestate. Estos estos 
  //almacenan la informacion necesria para registrar un nuevo usuario

  const handleRegister = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });//handle register o manejho del registro es una funcion asincronica que 
      //se ejecuta cuando se intenta registrar un nuevo usuario.
      // Se usa Fetch para enviar una solicitud POST a la api con la informacion como un objeto
      //se crea un encabezado content-type - application/json para indicar el cuerpo 
      //de la solicitud esta en formato JSON
      //JSON:stringify la informacion del nuesvo usuario se ordena mediante el orden del cuerpo

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso
        Alert.alert('Registro Exitoso', 'El usuario ha sido registrado exitosamente.');
        console.log('Usuario registrado:', data);
      } else {
        // Error en el registro
        Alert.alert('Error', `Hubo un error en el registro: ${data.message}`);
        console.error('Error en el registro:', data);
      }

      //Despues de la solicitud y esperar la respuesta d ela api y convertirla en el formato JSON
      //Verifica si la respuesta fue exitosa ataves de response.ok
      //si es asi muestra una alerta en consola si fue exitoso el registro
      

    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      Alert.alert('Error', 'Hubo un error en la solicitud de registro. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="URL del Avatar"
        value={avatar}
        onChangeText={setAvatar}
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '80%',
  },
});

export default RegisterScreen;
