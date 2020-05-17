import React, { Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
}   from 'react-native'
import { BASE_API_URL } from "./global/util";
import axios from 'axios';

class RegisterPage extends Component{

    state = {
        email: '',
        password: '',
        messageSuccess: '',
        messageError: ''
    }

    registerClickHandler() {
        console.log(this.state.email, this.state.password)
        if (this.state.email !== '' && this.state.password !== ''){
            const dataPayloads = {
                "email": this.state.email,
                "password": this.state.password
            }
            axios.post(BASE_API_URL + '/Users', dataPayloads)
                .then(res => {
                    console.log(res)
                    this.setState({
                        messageSuccess: 'Congrats! You are succesfully registered!'
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        messageError: 'Registration failed! Please try again'
                    })
                })

        }
    }

    render() {
        return(
            <View style={{ flex: 1}}>
                <Text style={{marginLeft: 25, marginTop: 50 , fontSize: 25}}>Registration Form</Text>
                <View style = {{ marginLeft: 25 }}>
                    {this.state.messageSuccess !== '' &&
                    <Text style={{ color: 'green' }}>{this.state.messageSuccess}</Text>
                    }
                    {this.state.messageError !== '' &&
                    <Text style={{ color: 'red'}}>{this.state.messageError}</Text>
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
                <View style={{ flexDirection: 'row', marginLeft: 25 , marginTop: 80}}>
                    <TouchableOpacity
                        keyboardType={'email-addresss'}
                        returnKeyType={'done'}
                        onPress={() => this.registerClickHandler()}
                        style={{ backgroundColor: 'green', width: '40%'}}>
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight:'500', color:'white',margin: 10}}> Register </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        secureTextEntry={true}
                        onPress={ ()=> this.props.navigation.navigate('Main')}
                        style={{ backgroundColor: 'grey', width: '40%', borderRadius: 3, marginLeft: 25 }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight:'500', color:'white',margin: 10}}> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default RegisterPage ;