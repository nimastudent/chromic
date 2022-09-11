<template>
  <div>123</div>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="/api/bone/insert"
    multiple
    :limit="3"
    with-credentials
    :data="{ pid: 1 }"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const fileList = ref([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg'
  }
])
</script>

<style></style>
