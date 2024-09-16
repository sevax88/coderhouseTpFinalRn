import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import SubmitButton from '../components/SubmitButton'
import { useGetUserQuery } from '../services/users'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'
import {colors} from "../global/colors";

const MyProfile = ({navigation}) => {
    const localId = useSelector(state => state.auth.localId)
    const {data: user, isSuccess, isLoading, isError, error} = useGetUserQuery({localId})
    useEffect(() => {
        if (isSuccess) console.log(user)
        if (isError) console.log(error)
    }, [isSuccess, isError])

    if (isLoading) return <LoadingSpinner/>
    return (
        <View style={styles.container}>
            <Image
                source={user.image ?
                    {uri: user.image}
                    :
                    require("../../assets/profile_default.png")}
                resizeMode='cover'
                style={styles.image}
            />
            <SubmitButton title="Add profile image" onPress={() => navigation.navigate("ImageSelector")}/>
            <SubmitButton title="Add delivery address" onPress={() => navigation.navigate("LocationSelector")}/>
            <Text> Addreses </Text>
            <FlatList
                data={user.locations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.addressText}>{item.address}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: "center",
        gap: 20,
        flex: 1
    },
    image: {
        width: 150,
        height: 150
    },
    card: {
        backgroundColor: colors.blue1,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5, // Para Android
        width: 300,
    },
    addressText: {
        fontSize: 12,
        color:"white",
    },
})
