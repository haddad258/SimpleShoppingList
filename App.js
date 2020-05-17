import React, { Component } from 'react'
import MainPage from './src/MainPage'
import LoginPage from './src/Login'
import RegisterPage from './src/Register'
import Productpage from './src/products/Product'
import ProductDetail from './src/products/ProductDetail'

import { StackNavigator } from 'react-navigation'
const Router = StackNavigator({
    Main: {screen: MainPage},
    Login: {screen: LoginPage},
    Register: {screen: RegisterPage},
    Product: {screen: Productpage},
    ProductDetail: {screen: ProductDetail}
})
export default class App extends Component {
    render () {
        return <Router />
    }
}