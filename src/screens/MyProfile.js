import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import SubmitButton from '../components/SubmitButton'
import { useGetUserQuery } from '../services/users'
import {useDispatch, useSelector} from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'
import {colors} from "../global/colors";
import { setSelectedAddressId } from '../features/address/addressSlice';


const MyProfile = ({navigation}) => {
    const localId = useSelector(state => state.auth.localId)
    const {data: user, isSuccess, isLoading, isError, error} = useGetUserQuery({localId})
    const dispatch = useDispatch()

    const selectedAddressId = useSelector(state => state.address.selectedAddressId);

    useEffect(() => {
        if (isSuccess) console.log(user)
        if (isError) console.log(error)
    }, [isSuccess, isError])

    const handleSelectAddress = (id) => {
        dispatch(setSelectedAddressId(id));
    }

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
            <Text> Addreses: You can select one for delivery </Text>
            <FlatList
                data={user.locations}
                keyExtractor={item => item.id}
                renderItem = {({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selectedAddressId === item.id && styles.selectedCard
                        ]}
                        onPress={() => handleSelectAddress(item.id)}
                    >
                        <Text style={styles.addressText}>{item.address}</Text>
                    </TouchableOpacity>
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
        shadowOffset: {width: 0, height: 2},
        elevation: 5,
        width: 300,
    },
    addressText: {
        fontSize: 12,
        color: "white",
    },

    selectedCard: {
        backgroundColor: "red",
    }
})
