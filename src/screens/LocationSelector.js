import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { mapStaticApi } from '../firebase/googleApi'
import SubmitButton from '../components/SubmitButton'
import { usePostUserLocationMutation } from '../services/users';
import { useSelector } from 'react-redux';

const LocationSelector = ({navigation}) => {

    const [location,setLocation] = useState({
        latitude:"",
        longitude:""
    })
    const [address,setAddress] = useState("")
    const localId = useSelector(state => state.auth.localId)
    const [triggerPostUserLocation] = usePostUserLocationMutation()

    useEffect(()=>{
        (
            async () => {
                const {status} = await Location.requestForegroundPermissionsAsync()
                if(status !== "granted") return
                const newLocation = await Location.getCurrentPositionAsync()
                setLocation({
                    latitude:newLocation.coords.latitude,
                    longitude:newLocation.coords.longitude
                })
            }
        
        )()
    },[])

    useEffect(()=>{
        (
            async () => {
                if(location.latitude){
                const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapStaticApi}`
                const response  = await fetch(urlReverseGeocoding)
                const data = await response.json()
                setAddress(data.results[0].formatted_address)
                }
            }
        )()
    },[location])

    const handleConfirmLocation = () => {
        const userLocation = {
            ...location,
            address
        }
        triggerPostUserLocation({localId,userLocation})
        navigation.navigate("MyProfile")
    }

    return (
        <View style={styles.container}>
            <View style={styles.addressContainer}>
                <Text style={styles.addressText}>Address: {address}</Text>
            </View>
            <View style={styles.mapContainer}>
                <MapPreview location={location} />
            </View>
            <SubmitButton title="Confirm Location" onPress={handleConfirmLocation} />
        </View>
    );
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    addressText: {
        textAlign: 'center',
    },
    addressContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    mapContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
