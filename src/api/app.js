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

export function getAppMembers(appid) {
  return request({
    url: '/api/v1/apps/' + appid + '/members',
    method: 'get'
  })
}

export function addAppMembers(appid, userIds) {
  return request({
    url: '/api/v1/apps/' + appid + '/members',
    method: 'post',
    data: { 'user_ids': userIds }
  })
}

export function deleteAppMembers(appid, userId) {
  return request({
    url: '/api/v1/apps/' + appid + '/members/' + userId,
    method: 'delete'
  })
}