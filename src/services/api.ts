import axios from 'axios'

export const api = axios.create({
  baseURL: "https://bolao-da-copa-2022.herokuapp.com/"
  // baseURL: 'http://192.168.15.14:3333'
})