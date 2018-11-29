import request from '@/utils/request'

export function login(formdata) {
	return request({
		method: 'post',
		url: '/login',
		data: formdata,
		transformRequest:[
			function(data) {
				return "name="+data.name + "&passwd=" + data.passwd
			}
		]
	})
}

