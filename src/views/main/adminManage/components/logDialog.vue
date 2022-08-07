<template>
  <el-dialog
    :model-value="logDialogVisible"
    title="日志"
    @close="handleClose"
    width="40vw"
  ></el-dialog>
</template>

<script setup>
import { getAllLog } from '@/api/systemManage/adminManage'
import { defineProps } from 'vue'

const props = defineProps({
  logDialogVisible: Boolean
})

const emits = defineEmits(['update:logDialogVisible'])


// 这个接口可能有问题 暂时 不写这个模块了  系统设置 基本上完成了  你可以 自己建一个项目 按照这种思路 来一遍   然后 自己看下 git  学会git 的使用方法
const getList = () => {
  getAllLog().then((res) => console.log(res))
}

const handleClose = () => {
  emits('update:logDialogVisible', false)
}

getList()
</script>
