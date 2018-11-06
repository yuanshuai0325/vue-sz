import { getDevice, addUse } from '@/api/device'

import * as types from '../mutation-types.js'

const dev = {
	state: {
		device: [],
	},
	getters: {
		device(state) {
			return state.device
		}
	},
	mutations: {
		[types.SET_DEVICE](state, device) {
			state.device = device
		}
	},
	actions: {
		GetDevice({commit}) {
			return new Promise((resolve, reject) => {
				getDevice().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_DEVICE, resp.data.ret)
						resolve(resp.data)
					} else {
						reject(resp.data)
					}
				}).catch(err => {
					reject('device数据更新失败111', err)
				})
			})
		},
		AddUse({commit},formdata) {
			return new Promise((resolve, reject) => {
				addUse(formdata).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						resolve(resp.data)
					} else {
						reject(resp.data)
					}
				}).catch(err => {
					reject('使用列表更新失败', err)
				})
			})
		}
	}
}

export default dev