.
<template>
  <div class="content">
    <div class="msglist">
      <search></search>
      <chatlist></chatlist>
    </div>
    <div class="chatbox">
      <message></message>
      <!-- <v-text></v-text> -->
    </div>
  </div>
</template>

<script>
import search from './components/search.vue'
import chatlist from './components/chatList.vue'
import message from './components/message.vue'
import { getChatList } from '@/api/chat/chat'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    search,
    chatlist,
    message
  },
  mounted() {
    this.$store.dispatch('chat/fetchChatList')
    // mapActions(['chat/fetchChatList'])
    // console.log(this.$store)
  },
  methods: {
    async fetchChatList() {
      const res = await getChatList()
      if (res.success) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  width: 800px;
  margin-left: 20px;
  margin-top: 15px;
  border: 1px solid rgb(230, 230, 230);
}

.msglist {
  width: 250px;
  background: rgb(230, 230, 230);
}

.chatbox {
  flex: 1;
}
</style>
>
