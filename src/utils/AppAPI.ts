import { getToken } from './LocalStorageService'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export const API_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
}


function makeApi(method: string, url: string, data?: any) {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `GSA ${getToken()}`,
    },
    body: JSON.stringify(data),
  })
}

function makeApiGet(method: string, url: string) {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `GSA ${getToken()}`,
    },
  })
}


export function callApi(method: string, url: string, data?: any) {
  return makeApi(method, url, data).then(res => {
    return res.json().then(json => {
      if (json === 'invalid_token') {
        window.location.href = '#/'
      } else {
        return Promise.resolve(json)
      }
    })
  })
}

export function callApiGet(method: string, url: string) {
  return makeApiGet(method, url).then(res => {
    return res.json().then(json => {
      if (json === 'invalid_token') {
        window.location.href = '#/'
      } else {
        return Promise.resolve(json)
      }
    })
  })
}

export function callLoginApi(method: string, url: string, data?: any) {
  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
