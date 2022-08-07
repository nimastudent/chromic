<template>
  <div><span>血液状态:</span><input ref="stateRef" type="file" /></div>

  <div><span>血生化:</span><input ref="rawRef" type="file" /></div>
  <div>该项单击提交后上传</div>
  <el-button @click="subimt" type="primary">提交</el-button>
</template>
<script setup>
import { ref } from 'vue'
import { addHealthyAssess } from '@/api/healthAssessment/main.js'

const props = defineProps({
  pid: Number,
  activeUrl: String
})

const stateRef = ref()

const rawRef = ref()

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
</script>
<style lang="scss" scoped></style>
