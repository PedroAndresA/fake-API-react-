import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
//en la parte de importaciones tenemos
//useffect, useState importamos los hooks de react que utilizaran 
//para manejar los efectos secundarios y estados en componentes funcionales
//View,text,flatlists, importa componentes y  estilos basicos de reactnativeen el componente.



const ProductListScreen = () => {
  //declaro el componente del archivo

  const [products, setProducts] = useState([]);
//utilizamos el hook useState para declarar un estado llamado productosque genera una rreglo vacio
//setproducts es una funcion que se utiliza para actualizar ese estado
  
useEffect(() => {// use efect para realizar operaciones que que el componente se ha renderizado
    // Lógica para obtener datos de la API
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <View style={styles.container}> // view se utiliza como contenedor principal con el titulo text y una lista
    //de productos Flatlist
      <Text style={styles.title}>Lista de Productos</Text>
      <FlatList  //flatlist se configura para mostrar los datos de productos en dos columnas  
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Muestra dos columnas
        renderItem={({ item }) => (//render item define como se renderiza cada elemento de la lista
        //en este caso se muestra la imagen el titulo su precio y descipcion
          <View style={styles.productContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>{`$${item.price.toFixed(2)}`}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
          </View>
        )}
      />
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
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10, // Bordes redondeados
    borderWidth: 1,
    borderColor: '#bdc3c7',
    width: '45%', // Ancho del contenedor para mostrar dos columnas
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5, // Bordes redondeados para la imagen
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#34495e',
  },
});

export default ProductListScreen;
