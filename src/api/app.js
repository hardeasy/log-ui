import request from '@/utils/request'

export function getAppList(params) {
  return request({
    url: '/api/v1/apps',
    method: 'GET',
    params
  })
}
