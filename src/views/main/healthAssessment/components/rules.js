import { ElMessage } from 'element-plus'

const rules = {
  common: {
    rule: [
      {
        type: 'number',
        field: 'age',
        title: '年龄',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'radio',
        title: '性别',
        field: 'sex',
        options: [
          { value: '男', label: '男', disabled: false },
          { value: '女', label: '女', disabled: false }
        ]
      },
      {
        type: 'input',
        title: '受教育情况',
        field: 'education',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '吸烟史',
        field: 'smoke',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '饮酒',
        field: 'drink',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    ]
  },
  sift: {
    rule: [
      {
        type: 'input',
        title: '家族病史',
        field: 'family',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '个人病史',
        field: 'personal',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      {
        type: 'input',
        title: '个人病史',
        field: '锻炼参与',
        validate: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    ]
  },
  composition: {
    rule: [
      {
        type: 'number',
        field: 'height',
        title: '身高(cm)',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'weight',
        title: '体重（kg）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'waist',
        title: '腰围（cm）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'hip',
        title: '臀围（cm）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fat',
        title: '脂肪量',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'lbw',
        title: '瘦体重',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fatRate',
        title: '脂肪比（%）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  heartAdapt: {
    rule: [
      {
        type: 'number',
        field: 'max',
        title: '最大释氧量',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  bone: {
    rule: [
      {
        type: 'upload',
        field: 'density',
        title: '骨密度',
        value: [],
        props: {
          action: 'http://47.98.120.130:8080/bone/insert',
          name: 'density',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            ElMessage({
              type: 'success',
              message: '已上传成功，无需手动提交',
              duration: 1500
            })
          },
          data: {}
        }
      }
    ],
    option: {
      submitBtn: false,
      resetBtn: false,
      onSubmit: function (formData) {}
    }
  },
  BM: {
    rule: [
      {
        type: 'upload',
        field: 'BM',
        title: '肌骨健康',
        value: [],
        props: {
          action: 'http://47.98.120.130:8080/BM/insert',
          name: 'density',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      }
    ]
  },
  sweet: {
    rule: [
      {
        type: 'number',
        field: 'randomSweet',
        title: '随机糖（mmol/L）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'fastingSweet',
        title: '空腹糖（mmol/L）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'INS',
        title: '空腹胰岛素',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'HbAlc',
        title: 'HbAlc（%）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'HbAlc',
        title: 'HbAlc（%）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  bloodFat: {
    rule: [
      {
        type: 'number',
        field: 'HDL',
        title: 'HDL',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'LDL',
        title: 'LDL',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'TC',
        title: '总胆固醇（mg/dl）',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'TG',
        title: '甘油三脂(mg/dl)',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  sign: {
    rule: [
      {
        type: 'number',
        field: 'pressure',
        title: '血压',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'number',
        field: 'sweet',
        title: '自测糖',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  vessel: {
    rule: [
      {
        type: 'input',
        field: 'stress',
        title: '血管弹性',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      },
      {
        type: 'input',
        field: 'block',
        title: '血阻',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  },
  blood: {
    rule: [
      {
        type: 'upload',
        field: 'raw',
        title: '血生化',
        value: [],
        props: {
          action: 'http://47.98.120.130:8080/blood/insert',
          name: 'state',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      },
      {
        type: 'upload',
        field: 'state',
        title: '血液状态',
        value: [],
        props: {
          action: 'http://47.98.120.130:8080/blood/insert',
          name: 'raw',
          withCredentials: true,
          limit: 1,
          onSuccess: function (res, file) {
            if (res.success) {
              ElMessage({
                type: 'success',
                message: '已上传成功，无需手动提交',
                duration: 1500
              })
            }
          },
          data: {}
        }
      }
    ]
  },
  lung: {
    rule: [
      {
        type: 'number',
        field: 'VC',
        title: '肺活量',
        validate: [{ type: 'number', required: true, message: '请输入数字' }]
      }
    ]
  }
}

export default {
  rules
}
