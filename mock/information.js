import Mock from 'mockjs'
export default {
  'POST /information': Mock.mock({
    code: 200,
    msg: '',
    data: {
      information: {
        name: '小清新',
        age: 28,
        gender: 1,
        avatar: 'https://p.ssl.qhimg.com/dmfd/400_300_/t01ed3026fc8c600fcb.gif',
        birthday: '1990-12-11',
        address: {
          provinde: 1,
          city: 1,
          county: 1,
        },
        job: 'IT',
        signature: '虚心使人进步，骄傲使人落后',
				collect: []
      },
      'pictures|50-69': [{
        'id|+1': 2,
        url: '@image'
       }]
    }
  })
};
