<template>
  <div class="text">
    <div class="pic">
      <i class="el-icon-picture-outline icon"></i>
    </div>
    <textarea
      ref="text"
      v-model="content"
      @keyup="onKeyup"
      @click="showEmoji = false"
    ></textarea>
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      content: '',
      frequency: 0,
      warn: false
    }
  },
  computed: {
    ...mapState(['chat/selectId'])
  },
  mounted() {
    this.$refs.text.focus()
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectId() {
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === '') {
        if (this.frequency === 0) {
          this.warn = true
          this.frequency++
          setTimeout(() => {
            this.warn = false
          }, 1000)
        }
      }
    }
  },
  methods: {
    // 回车发送消息
    onkeyup(e) {
      if (e.keyCode === 13) {
        this.send()
      }
    },
    // 单击发送按钮发送信息
    send() {
      this.warn = true
      if (this.content.length <= 1) {
        this.warn = true
        this.content = ''
        setTimeout(() => {
          this.warn = false
        }, 1000)
      } else {
        this.$store.dispatch('chat/sendMsg', this.content)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  position: relative;
  min-height: 150px;
  height: 20vh;
  background: #fff;
}

.pic {
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 30px;
}

.icon {
  cursor: pointer;
}

.icon:hover {
  color: #1aad19;
}

.emojiBox {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: -210px;
  left: -100px;
  width: 300px;
  height: 200px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  box-shadow: 0 1px 2px 1px #d1d1d1;
}

textarea {
  box-sizing: border-box;
  padding: 0 30px;
  height: 110px;
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Micrsofot Yahei';
  resize: none;
}
.send {
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 75px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #f5f5f5;
  font-size: 14px;
  color: #7c7c7c;
}

.send:hover {
  background: rgb(18, 150, 17);
  color: #fff;
}

.warn {
  position: absolute;
  bottom: 50px;
  right: 10px;
  width: 110px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  box-shadow: 0 1px 5px 1px #bdbdbd;
}

.warn,
.appear-enter-active,
.appear-leave-active {
  transition: all 1s;
}

.warn,
.appear-enter,
.appear-leave-active {
  opacity: 1;
}

.warn::before {
  content: ' ';
  position: absolute;
  top: 100%;
  right: 20px;
  border: 7px solid transparent;
  border-top-color: #fff;
  filter: drop-shadow(1px 3px 2px #bdbdbd);
}
</style>
