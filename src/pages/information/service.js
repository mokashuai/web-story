import R from 'utils/axios'
export default {
	getInformation: body => R({body, url: '/information'}),
}
