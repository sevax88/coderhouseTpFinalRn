import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByUserQuery } from '../services/orders'

const OrderDetail = ({route}) => {
    const {id} = route.params;
    const localId = useSelector((state) => state.auth.localId);
    const {data: order, isSuccess} = useGetOrderByUserQuery({localId, orderId: id});

    useEffect(() => {
        if (isSuccess) console.log(order);
    }, [isSuccess]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Order Detail</Text>
            {isSuccess && order && (
                <>
                    <Text style={styles.detailText}>Date: {order.createdAt}</Text>
                    <Text style={styles.detailText}>Total Amount: {order.total}</Text>
                    <Text style={styles.detailText}>Delivery Address: {order.selectedAddressString}</Text>
                    {order.items.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Text style={styles.itemText}>Item: {item.title}</Text>
                            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemText}>Price: {item.price}</Text>
                        </View>
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f7f7', // Color de fondo claro
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
    },
    itemContainer: {
        marginVertical: 8,
        padding: 16,
        backgroundColor: '#fff', // Fondo blanco para los elementos
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2, // Sombra para Android
    },
    itemText: {
        fontSize: 16,
    },
});

export default OrderDetail;
