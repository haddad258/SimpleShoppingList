import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import axios from 'axios'
import { BASE_API_URL } from "../global/util";


class ProductDetail extends Component {
    
    state = {
        product_name: '',
        description: '',
        price: '',
        image: ''
    }

    componentDidMount(){
        const id = this.props.navigation.state.params.id
        this.fetchDataDetails(id)
        // console.log(this.props)
    }

    fetchDataDetails = async (id) => {
        const url_api = `${BASE_API_URL}/shoppinglists/${id}`
        axios.get(url_api)
            .then(res => {
                console.log(res)
                this.setState({
                    product_name: res.data.product_name,
                    description: res.data.description,
                    price: res.data.price,
                    image: res.data.image
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return (
            <View style = {{ flex: 1 }}>
                <Image source={{ uri: this.state.image }}
                       style={{ width: '100%', height: 300, resizeMode: 'cover' }} />
                <View style={{ padding: 10, backgroundColor: '#ffffff' }}>
                    <Text style = {{ color: '#000000', fontWeight: 'bold', fontSize: 18 }}>{this.state.product_name}</Text>
                    <Text style = {{ color: '#000000', fontSize: 16 }}>Rp. {(this.state.price).toLocaleString('id')}</Text>
                </View>
            </View>
        )
    }

}

export default ProductDetail