import { getallUse, getallStorage } from '@/api/dashboard'

import * as types from '../mutation-types.js'

const dashboard = {
	state: {
		pagesizes: [20,30,40,50],
		pagesize: 20,
		total: 200,
		all: '',
	},
	getters: {
		pagesizes(state) {
			return state.pagesizes
		},
		pagesize(state) {
			return state.pagesize
		},
		total(state) {
			return state.total
		},
		all(state) {
			return state.all
		},
	},
	mutations: {
		[types.SET_ALL](state, alluse) {
			state.all = alluse
		},
		[types.SET_ALL](state, allstorage) {
			state.all = allstorage
		},
	},
	actions: {
		GetAllUse({commit}) {
			return new Promise((resolve, reject) => {
				getallUse().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_ALL, resp.data.ret)
						resolve("all使用获取成功")
					} else {
						reject("all使用获取失败")
					}
				}).catch(err => {
					reject(err.data.ret)
				})
			})
		},
		GetAllStorage({commit,state}) {
			return new Promise((resolve, reject) => {
				getallStorage().then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_ALL, resp.data.ret)
						resolve("all库存获取成功")
					} else {
						reject("all库存获取失败")
					}
				}).catch(err => {console.log(13)
					reject(err.data.ret)
				})
			})
		},
		GetAll({commit},value) {
			return new Promise((resolve,reject) => {
				if (value) {
					this.dispatch("GetAllUse").then(resp => {resolve(resp)}).catch(err => {reject(err)})
				} else {
					this.dispatch("GetAllStorage").then(resp => {resolve(resp)}).catch(err => {reject(err)})
				}
			})
		}
	}
}

export default dashboard