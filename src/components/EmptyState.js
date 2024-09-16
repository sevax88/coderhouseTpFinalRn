import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

const EmptyState = () => {
    return (
        <View style={styles.container}>
            <Image source= {require('../../assets/empty-state.jpg')} style={styles.image} resizeMode="contain"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default EmptyState;