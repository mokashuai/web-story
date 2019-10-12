import R from 'utils/axios'
export default {
	getList: body => R({ body, url: '/list' }),
}
export const getDetail = body => R({ body, url: '/detail' });
