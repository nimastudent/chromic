<template>
  <el-dialog :model-value="dialogVisible" title="会员套餐管理"></el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['update:dialogVisible'])

const prop = defineProps({
  dialogVisible: Boolean
})

const handleClose = () => {
  emits('update:dialogVisible', false)
}
</script>
