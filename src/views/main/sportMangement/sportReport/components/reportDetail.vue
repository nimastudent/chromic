<template>
  <el-dialog
    :model-value="detailDialogVisible"
    title="汇报详细"
    @close="handleClose"
    width="50vw"
  >
    <div style="display: flex; justify-content: flex-end">
      <el-button @click="handleClickAdvice" type="primary">提出意见</el-button>
    </div>
    <el-descriptions title="" :column="2" border :size="'large'">
      <el-descriptions-item
        label="患者姓名"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.patientName }}</el-descriptions-item
      >
      <el-descriptions-item
        label="电话号码"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.telephone }}</el-descriptions-item
      >
      <el-descriptions-item
        label="汇报时间"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.reportDate }}</el-descriptions-item
      >
      <el-descriptions-item
        label="医生姓名"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.doctorName }}</el-descriptions-item
      >
      <el-descriptions-item
        label="汇报动作"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.actionName }}</el-descriptions-item
      >
      <el-descriptions-item
        label="医生建议"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
        >{{ tableData.advice }}</el-descriptions-item
      >
      <el-descriptions-item
        label="图片"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="tableData.pictures[0].picture"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
        />
      </el-descriptions-item>
      <el-descriptions-item
        label="影像"
        label-align="center"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="200px"
      >
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog v-model="dialogFormVisible" title="提出建议" append-to-body>
      <el-form :model="form" ref="formRef">
        <el-form-item
          label="医生建议"
          label-width="140px"
          :rules="[{ required: true, message: '请填写建议' }]"
        >
          <el-input v-model="form.advice" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import { adviceSportById } from '@/api/sportManagement/actionHuiBao'
import { defineProps, defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  detailDialogVisible: Boolean
})

const emits = defineEmits(['update:detailDialogVisible'])

const handleClose = () => {
  emits('update:detailDialogVisible', false)
}

const formRef = ref()
const dialogFormVisible = ref(false)
const form = ref({
  advice: '',
  id: 0
})

const srcList = ref([])

const tableData = ref()

const setData = (data) => {
  tableData.value = data
  const picArr = tableData.value.pictures
  form.value.id = tableData.value.id
  if (picArr.length > 0) {
    const newArr = []
    picArr.forEach((element) => {
      newArr.push(element.picture)
    })
    srcList.value = newArr
  }
}

const handleClickAdvice = () => {
  form.value.advice = ''
  dialogFormVisible.value = true
}
const handleSubmit = async () => {
  console.log(form)
  const res = await adviceSportById(form.value)
  if (res) {
    ElMessage({
      message: '提交成功！',
      type: 'success'
    })
    dialogFormVisible.value = false
    handleClose()
  }
}

defineExpose({
  setData
})
</script>
<style lang="scss" scoped>
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>
