<template>
  <el-dialog
    :model-value="detailDialogVisible"
    title="汇报详细"
    @close="handleClose"
    width="40vw"
  >
    <div v-for="(item, index) in tableData" :key="index">
      {{ index }}: {{ item }}
    </div>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
  detailDialogVisible: Boolean
})

const emits = defineEmits(['update:detailDialogVisible'])

const handleClose = () => {
  emits('update:detailDialogVisible')
}

const tableData = ref()

const setData = (data) => {
  tableData.value = data
  console.log(tableData.value)
}

defineExpose({
  setData
})
</script>
<style lang="scss" scoped></style>
