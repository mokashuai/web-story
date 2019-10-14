import R from 'utils/axios'
export default {
	getList: body => R({ body, url: '/list', body }),
}
export const getDetail = body => R({ body, url: '/detail' });
