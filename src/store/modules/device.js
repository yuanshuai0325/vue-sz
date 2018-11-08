import { getDevice, addUse,addStorage } from '@/api/device'

import * as types from '../mutation-types.js'

const dev = {
	state: {
		device: [],
		search_hide: false,
	},
	getters: {
		device(state) {
			return state.device
		},
		search_hide(state) {
			return state.search_hide
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
						resolve(resp.data.ret)
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject('device数据更新失败111')
				})
			})
		},
		AddUse({commit},formdata) {
			return new Promise((resolve, reject) => {
				addUse(formdata).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						resolve(resp.data.ret)
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject('使用列表更新失败')
				})
			})
		},
		AddStorage({commit},formdata) {
			return new Promise((resolve, reject) => {
				addStorage(formdata).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						resolve(resp.data.ret)
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject('库存列表更新失败')
				})
			})
		}
	}
}

export default dev