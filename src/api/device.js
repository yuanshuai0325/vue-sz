import request from '@/utils/request'

export function getDevice() {
	return request({
		method: 'get',
		url: '/sdevice'
	})
}

export function addUse(formdata) {
	return request({
		method: 'post',
		url: '/adduse',
		data: formdata,
		transformRequest:[
			function(data) {
				let params = ''
				for(let index in data.device)
					params+='device='+data.device[index].value+'&sn='+data.device[index].sn+'&comment='+data.device[index].comment+'&'
				return 'name='+data.name+'&'+params
			}
		]
	})
}