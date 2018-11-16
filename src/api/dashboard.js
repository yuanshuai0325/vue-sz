import request from '@/utils/request'

export function getallUse(curpage,pagesize) {
	return request({
		method: 'post',
		url: '/searchalluse',
		data: [curpage,pagesize],
		transformRequest:[
			function(data) {
				return 'curpage='+data[0]+'&pagesize='+data[1]
			}
		]
	})
}

export function getallStorage(curpage,pagesize) {
	return request({
		method: 'post',
		url: '/searchallstorage',
		data: [curpage,pagesize],
		transformRequest:[
			function(data) {
				return 'curpage='+data[0]+'&pagesize='+data[1]
			}
		]
	})
}

export function updateDevice(data) {
	return request({
		method: 'post',
		url: '/updatedevice',
		data: data,
		transformRequest:[
			function(data) {
				let params = ''
				for(let key in data)
					params += key + "=" + data[key] + '&'
				return params
			}
		]
	})
}

export function updateUse(data) {
	return request({
		method: 'post',
		url: '/updateuse',
		data: data,
		transformRequest:[
			function(data) {
				let params = ''
				for(let key in data)
					params += key + "=" + data[key] + '&'
				return params
			}
		]
	})
}

export function updateStorage(data) {
	return request({
		method: 'post',
		url: '/updatestorage',
		data: data,
		transformRequest:[
			function(data) {
				let params = ''
				for(let key in data)
					params += key + "=" + data[key] + '&'
				return params
			}
		]
	})
}

export function updateDelete(data) {
	return request({
		method: 'post',
		url: '/updatedelete',
		data: data,
		transformRequest:[
			function(data) {
				let params = ''
				for(let key in data)
					params += key + "=" + data[key] + '&'
				return params
			}
		]
	})
}