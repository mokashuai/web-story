import R from 'utils/axios'
export default {
	getDetail: body => R({url: '/detail', body}),
}
