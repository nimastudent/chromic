<template>
  <!-- <div><span>血液状态:</span><input ref="stateRef" type="file" /></div>

  <div><span>血生化:</span><input ref="rawRef" type="file" /></div> -->

  <span>血液状态:</span>
  <el-upload
    ref="bloodUploadRef"
    list-type="picture-card"
    show-file-list
    :limit="1"
    :auto-upload="false"
    :with-credentials="true"
    :file-list="bloodFileList"
  >
    <template #default><i class="el-icon-plus"></i></template
  ></el-upload>

  <span>血生化:</span>
  <el-upload
    ref="rawUploadRef"
    list-type="picture-card"
    show-file-list
    :limit="1"
    :auto-upload="false"
    :with-credentials="true"
    :file-list="rawFileList"
  >
    <template #default><i class="el-icon-plus"></i></template
  ></el-upload>

  <h3>该项需要手动上传</h3>
  <el-button @click="subimt" type="primary">提交</el-button>
</template>
<script setup>
import { ref } from 'vue'
import { addHealthyAssess } from '@/api/healthAssessment/main.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  pid: Number,
  activeUrl: String
})

const stateRef = ref()

const rawRef = ref()

const bloodFileList = ref([])
const rawFileList = ref([])

const subimt = () => {
  let stateFile = stateRef.value.files[0]
  let rawFile = rawRef.value.files[0]

  let formData = new FormData()
  formData.append('pid', props.pid)
  formData.append('state', stateFile)
  formData.append('raw', rawFile)

  addHealthyAssess('blood', formData).then((res) => {
    console.log(res)
  })
}

const anotherSubmit = () => {
  const bloodFile = bloodFileList.value()
  const rawFile = rawFileList.value()
  if (bloodFile.length == 0 || rawFile.length == 0) {
    ElMessage({
      title: '请上传文件！',
      type: 'warnning',
      duration: 1000
    })
  } else {
    let formData = new FormData()
    formData.append('pid', props.pid)
    formData.append('state', stateFile)
    formData.append('raw', rawFile)
  }
}
</script>
<style lang="scss" scoped></style>
