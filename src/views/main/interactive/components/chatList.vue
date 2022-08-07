<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul class="ul">
      <li
        v-for="(item, index) in chatList"
        :key="index"
        @click="handleSelect(item)"
        class="sessionlist"
        :class="{ active: item.toUid === aId }"
      >
        <div class="list-left">
          <img
            class="avatar"
            width="42"
            height="42"
            :alt="item.name"
            src="./emptyUser.png"
          />
          <!-- :src="
              item.avator ? item.avatar : '@/assets/emptyUser.png'
            " -->
        </div>
        <div class="list-right">
          <div class="name">{{ item.name }}</div>
          <span class="time">{{ 123123 }}</span>
          <p class="lastmsg">
            <!-- {{ item.latestMessage }} -->
            wonima12312312312312313
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aId: 1
    }
  },
  computed: {
    // ...mapState(['selectId', 'searchText']),
    chatList() {
      const list = this.$store.getters['chat/chatList']
      console.log(list)
      return list
    },
    selectId() {
      const selectid = this.$store.getters['chat/selectId']
      this.aId = selectid
      return selectid
    }
  },
  methods: {
    handleSelect(item) {
      // console.log(id)
      this.$store.dispatch('chat/selectSession', item)
      this.aId = item.id
    }
  }
}
</script>

<style lang="scss" scoped>
.msglist {
  height: 70vh;
  overflow-y: auto;
}

.ul {
  padding: 0;
}

.sessionlist {
  display: flex;
  padding: 12px;
  transition: background-color 0.1s;
  font-size: 0;
  // pointer-events: none;
  user-select: none;
}

.sessionlist:hover {
  background-color: rgb(220, 220, 220);
}

.active {
  background-color: #c4c4c4;
}

.avatar {
  border-radius: 2px;
  margin-right: 12px;
}

.list-right {
  position: relative;
  flex: 1;
}

.name {
  display: inline-block;
  vertical-align: text-top;
  font-size: 14px;
}

.time {
  float: right;
  color: #999;
  font-size: 10px;
  vertical-align: top;
}

.lastmsg {
  position: absolute;
  font-size: 12px;
  width: 130px;
  height: 15px;
  line-height: 15px;
  color: #999;
  bottom: -6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
