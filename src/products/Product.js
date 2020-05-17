import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native'
import axios from 'axios'
import { BASE_API_URL, getToken } from '../global/util'
import ProductList from './ProductList'


class Product extends Component {
    state = {
        dataProducts: [],
        products: [],
        product_names: [],
        product_prices: [],
    }

    componentDidMount(){
        // jika token masih tersangkut dilokal gunakan AsyncStorage.removeItem('key token')
        // AsyncStorage.removeItem('token')
        this._getProducts()
    }

    // props di bisa dipakai ketika ada 'class'
    // method axios.post harus tetap mengirim data walau kosong '{}'

    _clickLogoutHandler = async () => {
        const dataToken = await getToken()
        console.log(dataToken)
        const logout_api = `${BASE_API_URL}/Users/logout?access_token=${dataToken}`
        console.log(logout_api)
        axios.post(logout_api, {})
            .then(response => {
                AsyncStorage.removeItem('token')
                this.props.navigation.navigate('Main')
            })
            .catch(err => {
                console.log(err)
            })
    }

    _getProducts = () => {
        axios.get(`${BASE_API_URL}/shoppinglists`)
            .then(response => {
                this.setState({
                    dataProducts: response.data,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <View style={{ flex: 1}}>
                <ScrollView style = {{ padding: 10 }}>
                    {this.state.dataProducts.length === 0 ? (
                        <ActivityIndicator
                            style={{ marginTop: 50 }}
                            size="large"/>) : (
                        this.state.dataProducts.map((dataku, index) =>
                            <ProductList
                                key = {index}
                                data = {dataku}
                                navigation = {this.props.navigation}
                            />
                        )
                    )}
                </ScrollView>
                <View>
                    <TouchableOpacity
                        onPress = { () => this._clickLogoutHandler()}
                        style={{ backgroundColor: '#FF395E', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#ffffff', margin: 20, fontWeight: 'bold', fontSize: 18 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    static navigationOptions = {
        title: `Catalog`
    }
}

export default Product