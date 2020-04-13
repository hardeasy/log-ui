import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/logs',
    method: 'GET',
    params
  })
}
