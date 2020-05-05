import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/users/me',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}

export function getList(params) {
  return request({
    url: '/api/v1/users',
    method: 'get',
    params
  })
}

export function addUser(data) {
  return request({
    url: '/api/v1/users',
    method: 'post',
    data
  })
}

export function editUser(id, data) {
  return request({
    url: '/api/v1/users/' + id,
    method: 'put',
    data
  })
}
