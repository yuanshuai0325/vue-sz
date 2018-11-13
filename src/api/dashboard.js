import request from '@/utils/request'

export function getallUse() {
	return request({
		method: 'get',
		url: '/searchalluse'
	})
}

export function getallStorage() {
	return request({
		method: 'get',
		url: '/searchallstorage'
	})
}

