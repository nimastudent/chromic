import { userlogin, logout } from '@/api/auth/user'

const state = () => ({
  token: '', // 登录token
  info: {}, // 用户信息,
  role: ''
})

// getters
const getters = {
  token(state) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  },
  infoChange(state, info) {
    state.info = info
  },
  saveRole(state, role) {
    state.role = role
    // sessionStorage.setItem("role", role);
  }
}

// actions
const actions = {
  // login by login.vue
  async login({ commit, dispatch }, params) {
    const res = await userlogin(params)
    if (res.success) {
      console.log(res)
      let role = res.body.role[0]
      commit('tokenChange', res.body.JSESSIONID)
      commit('saveRole', role)
      sessionStorage.setItem('cookie', res.body.JSESSIONID)
      sessionStorage.setItem('name', res.body.username)
      if (role === 'staff') {
        sessionStorage.setItem('doctorId', res.body.id)
      }
    }
  },
  // get user info after user logined
  getInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getInfoApi(params).then((res) => {
        commit('infoChange', res.data.info)
        resolve(res.data.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then((res) => {
        sessionStorage.setItem('cookie', '')
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
