import { getDevice, addUse, addStorage, searchDevice } from '@/api/device'

import * as types from '../mutation-types.js'

const dashboard = {
	state: {
		pagesizes = [20,30,40,50],
		total = ''
	},
	getters: {
		pagesizes(state) {
			return state.pagesizes
		},
		total(state) {
			return state.total
		}
	},
	mutations: {
		[types.SET_DEVICE](state, device) {
			state.device = device
		},
	},
	actions: {
		GetDevice({commit}) {
			return new Promise((resolve, reject) => {
				getDevice().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_DEVICE, resp.data.ret)
						resolve(resp.data.ret)
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject('device数据更新失败111')
				})
			})
		},
	}
}

export default dashboard