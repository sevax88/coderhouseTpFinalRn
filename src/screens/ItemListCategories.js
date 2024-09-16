import { FlatList, StyleSheet, View,Text} from 'react-native'
import  { useEffect, useState } from 'react'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from "../components/EmptyState";


const ItemListCategories = ({route}) => {

  const {category} = route.params
  const {data:products,isSuccess,isLoading,isError,error} = useGetProductsQuery(category)
  const [productsFiltered,setProductsFiltered] = useState([])

  useEffect(()=>{
    if(isSuccess){
      setProductsFiltered(products)
    }
  },[category,isSuccess])

  const onSearch = (input) => {
    console.log(input)
    if (input) {
      setProductsFiltered(productsFiltered.filter(product =>
          product.title.toLowerCase().includes(input.toLowerCase()) ||
          product.description.toLowerCase().includes(input.toLowerCase())
      ))
    } else {
      setProductsFiltered(products)
    }
  }

  if(isLoading) return <LoadingSpinner/>
  if(isError) return <View><Text>{error.message}</Text></View>

  return (
      <View style={styles.container}>
        <Search onSearch={onSearch}/>
        {productsFiltered.length === 0 ? (
            <EmptyState/>
        ) : (
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ProductItem product={item}/>}
            />
        )}
      </View>
  );
}

export default ItemListCategories

const styles = StyleSheet.create({
  container:{
    width:"100%",
    flex: 1
  }
})
