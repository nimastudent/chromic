import { getChatList, getChatContentById } from '@/api/chat/chat'
import SocketService from '@/utils/system/global.js'
import { getNowTime } from '@/utils/params/date.js'

const state = () => ({
  selectId: 0,
  selectName: '',
  selectChat: [],
  chatList: [],
  scoketService: SocketService.Instance
})

// getters
const getters = {
  chatList(state) {
    return state.chatList
  },
  selectChat(state) {
    return state.selectChat
  },
  selectName(state) {
    return state.selectName
  }
}

// mutations
const mutations = {
  SETCHATLIST(state, list) {
    state.chatList = list
  },
  SELECTID(state, id) {
    state.selectId = id
  },
  SELECTNAME(state, name) {
    state.selectName = name
  },
  SELECTCHAT(state, list) {
    state.selectChat = list
  }
}

// actions
const actions = {
  init({ state }) {
    SocketService.Instance.connect()
    state.scoketService = SocketService.Instance
  },
  // 发送信息
  sendMsg(context, msg) {
    const obj = {
      uid: sessionStorage.getItem('doctorId'),
      toUid: context.state.selectId,
      time: getNowTime(),
      type: 'text',
      content: msg,
      role: 'doctor'
    }
    // context.state.scoketService.send(msg)
  },
  closeConn({ state }) {
    SocketService.Instance.close()
  },
  async fetchChatList({ commit, dispatch }) {
    const res = await getChatList()
    if (res.success) {
      console.log(res.body[0])
      const sId = res.body[0].toUid
      getChatContentById({ toUid: sId }).then((res) => {
        commit('SELECTCHAT', res.body)
      })
      commit('SELECTID', sId)
      commit('SELECTNAME', res.body[0].name)
      commit('SETCHATLIST', res.body)
    }
  },
  selectSession({ commit, dispatch }, item) {
    commit('SELECTID', item.toUid)
    commit('SELECTNAME', item.name)
    console.log(item)
    dispatch('fetchChatById', item.toUid)
  },
  fetchChatById({ commit }, id) {
    getChatContentById({ toUid: id }).then((res) => {
      commit('SELECTCHAT', res.body)
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
