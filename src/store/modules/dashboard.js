import { getallUse, getallStorage, updateDevice } from '@/api/dashboard'

import * as types from '../mutation-types.js'

const dashboard = {
	state: {
		pagesizes: [2,3,4,5],
		pagesize: 2,
		total: 1,
		all: '',
		curpage: 1,
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
		curpage(state) {
			return state.curpage
		},
		cursize(state) {
			return state.pagesize
		},
	},
	mutations: {
		[types.SET_CURPAGE](state, curpage) {
			state.curpage = curpage
		},
		[types.SET_CURSIZE](state, cursize) {
			state.pagesize = cursize
		},
		[types.SET_ALL](state, data) {
			state.all = data
		},
		[types.SET_TOTAL](state, total) {
			state.total = total
		},
	},
	actions: {
		ChangeCurPage({commit},curpage) {
			commit(types.SET_CURPAGE,curpage)
		},
		ChangeCurSize({commit},cursize) {
			commit(types.SET_CURSIZE,cursize)
		},
		GetAllUse({commit,state}) {
			return new Promise((resolve, reject) => {
				getallUse(state.curpage,state.pagesize).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_TOTAL, resp.data.ret.pop().total)
						commit(types.SET_ALL, resp.data.ret)
						resolve("all使用获取成功")
					} else {
						reject(resp.data.ret)
					}
				}).catch(err => {
					reject(err.data.ret)
				})
			})
		},
		GetAllStorage({commit,state}) {
			return new Promise((resolve, reject) => {
				getallStorage(state.curpage,state.pagesize).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						commit(types.SET_TOTAL, resp.data.ret.pop().total)
						commit(types.SET_ALL, resp.data.ret)
						resolve("all库存获取成功")
					} else {
						reject("all库存获取失败")
					}
				}).catch(err => {
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
		},
		UpdateDevice({commit},data) {
			return new Promise((resolve,reject) => {
				updateDevice(data).then(resp => {
					let pd = resp.data.exec
					if (pd === 'true') {
						resolve("update device 成功")
					} else {
						reject("all库存获取失败")
					}
				}).catch(err => {
					reject(err.data.ret)
				})
			})
		},
	}
}

export default dashboard