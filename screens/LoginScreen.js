// Importa las bibliotecas necesarias
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Componente LoginScreen
const LoginScreen = ({ navigation }) => {
  // Estados para almacenar el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {//la funcion dandlelog que se ejecuta al precionar el boton de iniciar sesion
    
    try {
      // Realiza la solicitud de inicio de sesión a la API
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'GET',
      });

      // Verifica si la solicitud fue exitosa
      if (response.ok) {//comprueba si la conexion con la api fue exitosa
        // Obtiene los datos de los usuarios
        const users = await response.json();
        //convierte la respuesta en un formato JSON y la almacena en la variable de users

        // Encuentra el usuario con el correo y contraseña proporcionados
        const user = users.find((u) => u.email === email && u.password === password);
//gracial al metodo find que lo usamos para buscar a un usario con el correo y la contraseña 

// ##Manejo de los resultados de las busquedas
//si encuentra un usuario determina su rol y navega a la vista correspondiente y si no es asi lanza un error
        // Verifica si se encontró el usuario
        if (user) {
          // Navega a la vista correspondiente según el rol del usuario
          if (user.role === 'admin') {
            navigation.navigate('AdminScreen');
          } else if (user.role === 'customer') {
            navigation.navigate('ProductList');
          } else {
            Alert.alert('Error', 'Rol de usuario no válido.');
          }
        } else {
          // Muestra un mensaje de error si no se encontró el usuario
          Alert.alert('Error', 'Correo electrónico o contraseña incorrectos.');
        }
      } else {
        // Muestra un mensaje de error si la solicitud no fue exitosa
        Alert.alert('Error', 'Hubo un error en la solicitud de inicio de sesión.');
      }
    } catch (error) {
      // Muestra un mensaje de error si hay un error en la solicitud
      console.error('Error en la solicitud de inicio de sesión:', error);
      Alert.alert('Error', 'Hubo un error en la solicitud de inicio de sesión. Por favor, inténtalo de nuevo.');
    }// catch captura los errores que puedan ocurrur durante la solicitud
  };

  // Renderiza la interfaz de usuario del LoginScreen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
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
      <Button title="Ingresar" onPress={handleLogin} />
      <Text style={styles.text}>¿No tienes cuenta? Crea una <Text style={styles.link} onPress={() => navigation.navigate('Register')}>aquí</Text>.</Text>
    </View>
  );
};

// Estilos del componente
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
  text: {
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

// Exporta el componente
export default LoginScreen;
