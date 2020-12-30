import { __DEV__ } from '../config'

let PROTOCOL = window.location.protocol

let API_HOST = global.window
    ? `${PROTOCOL}//${window.location.hostname}`
    : `${PROTOCOL}//quic2.site`
let API_PORT = global.window ? window.location.port : '80'
let API_VERSION = '/api/v1'

if (__DEV__) {
    API_HOST = process.env.REACT_APP_API_HOST
    API_PORT = process.env.REACT_APP_API_PORT
}

export const API_ROOT = `${API_HOST}:${API_PORT}${API_VERSION}`