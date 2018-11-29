import { login } from '@/api/login'

import * as types from '../mutation-types.js'

const log_in = {
	state: {
		// token: '',
	},
	getters: {
		// token(state) {
			// state.token = sessionStorage.getItem("token")
			// return state.token
		// }
	},
	mutations: {
		[types.SET_TOKEN](state, token) {
			sessionStorage.setItem("token", token.token)
			// state.token = token
		},
	},
	actions: {
		Login({commit},data) {
			return new Promise((resolve, reject) => {
				login(data).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_TOKEN, resp.data.ret)
						resolve("登录成功")
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject("登录出错")
				})
			})
		},
	}
}

export default log_in