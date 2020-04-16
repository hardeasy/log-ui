import request from '@/utils/request'

export function getAppList(params) {
  return request({
    url: '/api/v1/apps',
    method: 'GET',
    params
  })
}

export function addApp(data) {
  return request({
    url: '/api/v1/apps',
    method: 'post',
    data
  })
}

export function editApp(data) {
  return request({
    url: '/api/v1/apps',
    method: 'put',
    data
  })
}
