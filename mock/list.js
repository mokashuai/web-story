import Mock from 'mockjs'
const Random = Mock.Random;

export default {
  'GET /list': Mock.mock({
    code: 200,
    msg: '',
    data: {
      total: 56,
      'list|56': [{
        'name|2-3': Random.cword('指示单词中字符的个数默认值为之间的随机数', 4, 1),
        'avatar': '@image',
        'age|19-30': 19,
        'id|+1': 1
      }]
    }
  })
};
