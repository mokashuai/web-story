import R from 'utils/axios'
export default {
	getList: body => R({ body, url: '/picture' }),
}
