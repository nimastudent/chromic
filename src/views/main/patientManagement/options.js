export let options = [
  {
    label: '',
    prop: 'id',
    width: 50
  },
  {
    label: '姓名',
    prop: 'name',
    width: 100
  },
  {
    label: '性别',
    prop: 'sex',
    width: 50
  },
  {
    label: '电话',
    prop: 'telephone'
  },
  {
    label: '生日',
    prop: 'birthday'
  },
  {
    label: '身高(cm)',
    prop: 'height',
    width: 60
  },
  {
    label: '体重(kg)',
    prop: 'weight',
    width: 60
  },
  {
    width: 1
  },
  {
    label: '机构',
    prop: 'organization'
  },
  {
    label: '注册时间',
    prop: 'registerDate'
  },
  {
    label: '上次登录时间',
    prop: 'loginDate'
  },
  {
    label: '会员开始时间',
    prop: 'startDate'
  },
  {
    label: '会员截止时间',
    prop: 'endDate'
  },
  {
    label: '操作',
    prop: 'action',
    width: 300
  }
]

export function roleAddDoc() {
  options.splice(7, 0, { label: '所属医生', prop: 'doctorName', width: 90 })
}
