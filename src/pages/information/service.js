import R from 'utils/axios'
export default {
	getInformation: body => R({body, method: 'post', url: '/information'}),
}
