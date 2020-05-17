import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import axios from 'axios'
import { getToken } from './global/util'


export default class MainPage extends Component {
    componentDidMount(){
        this.fetchToken()
    }

    fetchToken = async () => {
        const Token = await getToken()
        console.log(Token)
        if (Token) {
            this.props.navigation.navigate('Products')
        }
    }


    render() {
        const {
            viewContainer,
            btnContainer,
            txtInsideBtn,
            btnBottom,
        } = Styles

        return (
            <View style={viewContainer}>
                <View style={{ marginLeft: 25, marginTop: 100 }}>
                    <Text style={{ color: 'white', fontSize: 45, fontWeight: 'bold' }}>Join</Text>
                    <Text style={{ color: 'white', fontSize: 45, fontWeight: 'bold' }}>Our App</Text>
                    <Text style={{ color: 'white', fontSize: 45, fontWeight: 'bold' }}>Now!</Text>
                </View>

                <View style={btnContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={btnBottom}>
                        <Text style={txtInsideBtn}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}
                        style={btnBottom}>
                        <Text style={txtInsideBtn}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    static navigationOptions = {
        header: null
    }
}


const Styles = StyleSheet.create({
    btnBottom: {
        marginLeft: 25,
        backgroundColor: 'grey',
        width: '40%',
        borderRadius: 3
    },
    txtInsideBtn: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        margin: 10
    },
    viewContainer: {
        flex: 1,
        backgroundColor: '#03B4D2'
    },
    btnContainer: {
        marginTop:180,
        flexDirection: 'row',
        marginLeft: 25
    }
})