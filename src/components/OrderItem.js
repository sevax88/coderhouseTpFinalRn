import { Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';


const OrderItem = ({item}) => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.total}>Total: {item.total} $</Text>
      </View>
      <Pressable onPress={()=>navigation.navigate("OrderDetail",{id:item.id})}>
          <AntDesign name="search1" size={48} color="black" />
      </Pressable>
      
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    container: {
        borderColor: colors.blue1,
        borderWidth: 1,
        width: "95%",
        marginHorizontal: "2.5%",
        marginVertical: 15,
        padding: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    containerText: {
        gap: 10,
        flexDirection: "column",
        alignItems: "flex-start"
    },
    date: {
        fontSize: 14,
    },
    total: {
        fontSize: 18,
        fontWeight: "600",
    }
})
