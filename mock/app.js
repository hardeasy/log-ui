import Mock from 'mockjs'

const data = Mock.mock({
  'items|3': [{
    id: '@integer(100,9999)',
    name: '@cname()',
    code: '@string(20)',
    access_token: '@string(32)',
    created_at: '@date()',
    updated_at: '@date()'
  }]
})

export default [
  {
    url: '/api/v1/apps',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 0,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
