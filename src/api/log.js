import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/logs',
    method: 'GET',
    params
  })
}

export function getDetail(id) {
  return request({
    url: '/api/v1/logs/' + id,
    method: 'GET',
  })
}
