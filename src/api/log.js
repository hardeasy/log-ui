import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/logs',
    method: 'GET',
    params
  })
}

export function getDetail(params) {
  return request({
    url: '/api/v1/logs/' + params.id,
    method: 'GET'
  })
}

export function getIndices() {
  return request({
    url: '/api/v1/indices',
    method: 'GET'
  })
}

export function deleteIndex(index) {
  return request({
    url: '/api/v1/indices/' + index,
    method: 'delete'
  })
}
