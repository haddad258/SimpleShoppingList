import React, { Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
}   from 'react-native'
import { BASE_API_URL, getToken } from "./global/util"
import axios from 'axios'

class LoginPage extends Component{

    state = {
        email: '',
        password: '',
        messageSuccess: '',
        messageError: ''
    }

    _saveToken = async(ini_token_saya) => {
        await AsyncStorage.setItem('token', ini_token_saya)
        const dataToken = await getToken()
        if (dataToken) {
            this.props.navigation.navigate('Product', { token: dataToken })
        }
    }

    _loginClickHandler  = () => {
        if (this.state.email !== '' && this.state.password) {
            const dataPayloads = {
                email : this.state.email,
                password : this.state.password
            }
            axios.post(BASE_API_URL + '/Users/login', dataPayloads)
                .then(respone => {
                    const token = respone.data.id
                    console.log(respone)
                    this.setState({
                        messageSuccess: 'Congrats! you have successfully logged in',
                        messageError: ''
                    })
                    this._saveToken(token)
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        messageError: 'Failed to login please check your email and password',
                        messageSuccess: ''
                    })
                })
        }
    }

    render(){
        return(
            <View style={{ flex: 1}}>
                <Text style={{marginLeft: 25, marginTop: 50 , fontSize: 25}}>Login Form</Text>
                <View>
                    {this.state.messageSuccess !== '' &&
                    <Text style={{ color: 'green' }}>{this.state.messageSuccess}</Text>
                    }
                    {this.state.messageError !== '' &&
                    <Text style={{ color: 'red' }}>{this.state.messageError}</Text>
                    }
                </View>
                <View style={{ marginLeft: 25, marginTop: 100}}>
                    <TextInput
                        onChangeText = { (text) => this.setState({ email: text }) }
                        style={{ width: '70%'}}placeholder="email">
                    </TextInput>
                    <TextInput
                        onChangeText = { (text) => this.setState({ password: text }) }
                        style={{ width: '70%'}} placeholder="password">
                    </TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 25 , marginTop: 180}}>
                    <TouchableOpacity
                        onPress = { () => this._loginClickHandler() }
                        style={{ backgroundColor: 'green', width: '40%'}}>
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight:'500', color:'white',margin: 10}}> Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ ()=> this.props.navigation.navigate('Main')}
                        style={{ backgroundColor: 'grey', width: '40%', borderRadius: 3, marginLeft: 25 }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight:'500', color:'white',margin: 10}}> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default LoginPage