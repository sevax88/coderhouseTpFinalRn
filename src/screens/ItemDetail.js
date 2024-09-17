import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import { colors } from '../global/colors'
import { addItemCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetProductQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'
import {useState} from "react";

const ItemDetail = ({route}) => {

  const {id} = route.params
  const {data:product,isLoading} = useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)

  const handleAddItemCart = () => {
    dispatch(addItemCart({...product,quantity:quantity}))
    navigation.navigate("CartStack")
  }

  const handleQuantityChange = (text) => {
    const value = parseInt(text, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  }

  if(isLoading) return <LoadingSpinner/>

  return (
      <View style={styles.container}>
        <View style={styles.containerDetail}>
          <Image
              style={styles.image}
              resizeMode='contain'
              source={{uri: product.image_url}}
          />
          <View style={styles.containerText}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Price: {product.price} $</Text>
              <TextInput
                  style={styles.quantityInput}
                  keyboardType='numeric'
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
              />
            </View>
          </View>
          <Pressable style={styles.button} onPress={handleAddItemCart}>
            <Text style={styles.buttonText}>Buy</Text>
          </Pressable>
        </View>
      </View>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  containerDetail: {},
  containerText: {
    width: "80%",
    gap: 20,
    margin: 20,
    marginHorizontal: "10%"
  },
  title: {
    fontSize: 20
  },
  description: {
    fontSize: 18
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    width: "100%",
    height: 250,
    marginVertical: 10
  },
  button: {
    width: "80%",
    marginHorizontal: "10%",
    backgroundColor: colors.blue3,
    borderRadius: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20

  },
  buttonText: {
    color: "white"
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
    padding: 5,
    width: 50,
  },
})