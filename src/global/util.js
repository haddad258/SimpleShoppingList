import {
    AsyncStorage
}   from 'react-native'

export const BASE_API_URL = 'http://172.104.50.9:3000/api'

export const getToken = async() => {
    const dataToken = await AsyncStorage.getItem('token')
    return dataToken
}