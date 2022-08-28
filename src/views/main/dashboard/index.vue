<template>
  <div class="box">我是首页</div>

  <div>
    <button @click="webScoketConnTest">testconne</button>
  </div>
</template>

<script setup>
import { error } from 'console'

const webScoketConnTest = () => {
  const wb = new WebSocket('wss://www.aikeyunkang.top:8081/websocket/server/1')
  wb.onopen = () => {
    console.log('opne')
  }
  wb.onerror = (error) => {
    console.log('error', error)
  }
  wb.onclose = () => {
    console.log('close')
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 15px;
}
</style>
