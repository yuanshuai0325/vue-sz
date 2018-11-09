import { getDevice, addUse, addStorage, searchDevice } from '@/api/device'

import * as types from '../mutation-types.js'

const dev = {
	state: {
		device: [],
		search_show: false,
		search_device: '',
	},
	getters: {
		device(state) {
			return state.device
		},
		search_show(state) {
			return state.search_show
		},
		search_device(state) {
			return state.search_device
		}
	},
	mutations: {
		[types.SET_DEVICE](state, device) {
			state.device = device
		},
		[types.SET_SEARCH_SHOW](state, show) {
			state.search_show = show
		},
		[types.SET_SEARCH_DEVICE](state, search_device) {
			state.search_device = search_device
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
		ChSearchDevice({commit},status) {
			commit(types.SET_SEARCH_SHOW,status)
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
		},
		SearchDevice({commit},data) {
			return new Promise((resolve, reject) => {
				searchDevice(data).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						console.log(1111,resp.data.ret)
						commit(types.SET_SEARCH_DEVICE, resp.data.ret)
						commit(types.SET_SEARCH_SHOW,true)
						resolve('查找硬件成功')
					} else {
						commit(types.SET_SEARCH_SHOW,false)
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject('查找硬件失败')
				})
			})
		},
	}
}

export default dev