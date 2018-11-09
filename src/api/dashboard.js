import request from '@/utils/request'

export function getDevice() {
	return request({
		method: 'get',
		url: '/sdevice'
	})
}

