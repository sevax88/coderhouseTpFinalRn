import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
import { useNavigation } from '@react-navigation/native'
import {LinearGradient} from "expo-linear-gradient";

const Category = ({item}) => {

  const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Products', { category: item })}>
            <LinearGradient
                colors={['#0000FF', '#FFFFFF']} 
                start={[0, 0]}
                end={[1, 0]}
                style={styles.container}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.text}>{item}</Text>
                </View>
            </LinearGradient>
        </Pressable>
    );
};

export default Category

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    cardContent: {
        padding: 30,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white',
    }
});
