import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@sentence(2)',
    time: '@datetime',
    level: '@sentence(1)',
    content: '@sentence(50,100)'
  }]
})

export default [
  {
    url: '/logs',
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
