<template>
  <!-- <div class="box">我是首页</div>

  <div>
    <button @click="webScoketConnTest">testconne</button>
    <button @click="sendData">send msg</button>

   <img src="" alt="" srcset="">
  </div> -->
</template>

<script setup>
// import { reactive } from 'vue'
// import SocketService from '@/utils/system/global.js'
// const data = reactive({
//   socketServe: SocketService.Instance
// })
// SocketService.Instance.connect()
// data.socketServe = SocketService.Instance
// data.socketServe.registerCallBack('callback1', data.socketServe)

import { ref } from 'vue-demi'

// const sendData = () => {
//   const obj = {
//     uid: 1,
//     toUid: 3,
//     type: 'text',
//     content: '今天天气不错',
//     time: '2022-08-28 12:16:00',
//     role: 'doctor'
//   }
//   data.socketServe.send(obj)
// }

const num = ref(0)

const img = ""
</script>

<style lang="scss" scoped>
.box {
  padding: 15px;
}
</style>
