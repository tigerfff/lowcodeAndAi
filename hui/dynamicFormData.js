export default {
  // 基础表单数据
  basicComponents: [
    {
      model: 'input',
      type: "el-input",
      label: "输入框",
      defaultValue: "",
      props: {
        description: "这是描述",
        placeholder: "请输入啊啊啊",
        tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符",
        regular: "^[^|':\\\\<>\"/?\\*]+$",
        required: true,
        tipsPlacement: 'top'
      }
    }
  ],
  // slot表单数据
  slotComponents: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
    slots: [{
      name: "append",
      children: ["元"]
    }, {
      name: "prepend",
      children: ["$"]
    }]
  }],
  // 普通表单数据
  formComponents: [{
    type: 'p',
    content: '啊啊啊啊啊啊',
    class: 'asasas'
  }, {
    type: 'img',
    props: {
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584964599193&di=35635236b043e2907e42657790c1b5d0&imgtype=0&src=http%3A%2F%2Fcase.52design.com%2Fupfiles%2F201107%2FL110719259198.jpg',
    },
    content: '啊啊啊啊啊啊',
    class: 'form-img'
  }, {
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: ""
  }, {
    model: 'selectSimple',
    type: "el-select",
    label: "下拉单选框",
    defaultValue: "",
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          selected: true,
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          selected: false,
          label: "DS-TVL001-1-6"
        }
      }
    ]
  }, {
    model: 'selectMultiple',
    type: "el-select",
    label: "下拉多选框",
    defaultValue: [],
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          selected: true,
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          selected: false,
          label: "DS-TVL001-1-6"
        }
      }
    ],
    props: {
      multiple: true,
    }
  }, {
    model: 'timePick',
    type: 'el-date-picker',
    label: "日期选择器",
    defaultValue: '',
    props: {
      type: "date",
      format: 'yyyy-MM-dd',
      name: "日期选择器"
    }
  }, {
    model: "checkboxSimple",
    type: "el-checkbox",
    label: "多选框",
    defaultValue: true,
    props: {
      label: "多选框"
    }
  }, {
    model: "checkboxMultiple",
    type: "el-checkbox-group",
    label: "多选框组",
    defaultValue: [],
    children: [{
      type: 'el-checkbox',
      props: {
        label: "1"
      },
      children: ['IS-TVL000-0-1']
    },
    {
      type: 'el-checkbox',
      props: {
        label: "2"
      },
      children: ['IS-TVL000-1-6']
    }]
  }, {
    model: 'radioSimple',
    type: "el-radio",
    label: "单选框",
    defaultValue: '单选框',
  }, {
    model: "radioMultiple",
    type: "el-radio-group",
    label: "单选框组",
    defaultValue: '',
    children: [{
        type: 'el-radio-button',
        props: {
          label: "16x32"
        }
      },
      {
        type: 'el-radio-button',
        props: {
          label: "32x64"
        }
      }
    ],
    props: {
      type: "simple"
    }
  }, {
    model: 'switch',
    type: "el-switch",
    label: '开关',
    defaultValue: false,
    props: {
      width: 52
    }
  }, {
    model: "pwdInput",
    type: "h-pwd-input",
    label: "密码输入框",
    defaultValue: ''
  }, {
    model: "inputNumber",
    type: "el-input-number",
    label: "数字输入框",
    defaultValue: ''
  }, {
    model: "ipInput",
    type: "h-ip-input",
    label: "IP输入框",
    defaultValue: ''
  }],
  // 搜索表单数据
  searchComponents: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: ""
  }, {
    model: 'selectSimple',
    type: "el-select",
    label: "下拉单选框",
    defaultValue: "1",
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          label: "DS-TVL001-1-6",
        }
      }
    ]
  }, {
    model: 'selectMultiple',
    type: "el-select",
    label: "下拉多选框",
    defaultValue: [],
    props: {
      multiple: true
    },
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          selected: true,
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          selected: false,
          label: "DS-TVL001-1-6"
        }
      }
    ]
  }, {
    model: 'timePick',
    type: 'el-date-picker',
    label: "日期选择器",
    defaultShow: false,
    props: {
      type: "date",
      format: 'yyyy-MM-dd'
    }
  }],

  // 组件组数据
  groupData: [{
    model: 'selectSimple',
    type: "el-select",
    label: "下拉单选框",
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          label: "DS-TVL001-1-6"
        }
      }
    ],
    defaultValue: "2"
  }, {
    model: "checkboxMultiple",
    type: "el-checkbox-group",
    label: "多选框组",
    children: [{
        type: 'el-checkbox',
        props: {
          label: "1"
        },
        children: ['IS-TVL000-0-1']
      },
      {
        type: 'el-checkbox',
        props: {
          label: "2"
        },
        children: ['IS-TVL000-1-6']
      }
    ],
    defaultValue: []
  }, {
    model: "radioMultiple",
    type: "el-radio-group",
    label: "单选框组",
    defaultValue: '',
    children: [{
        type: 'el-radio-button',
        props: {
          label: "16x32"
        }
      },
      {
        type: 'el-radio-button',
        props: {
          label: "32x64"
        }
      }
    ],
    props: {
      type: "simple",
    }
  }],

  // 联动数据
  linkData: [{
    model: 'selectSimple',
    type: "el-select",
    label: "下拉单选框",
    defaultValue: "1",
    children: [{
        type: 'el-option',
        props: {
          value: "1",
          label: "IS-TVL000-0-1"
        }
      },
      {
        type: 'el-option',
        props: {
          value: "2",
          label: "DS-TVL001-1-6"
        }
      }
    ],
    cascades: [{
      value: '1',
      fields: [{
        model: "input",
        hide: false
      }]
    }, {
      value: '2',
      fields: [{
        model: "input",
        hide: true
      }]
    }]
  }, {
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: ""
  }],

  // 表单校验数据
  checkData: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
    props: {
      placeholder: "请输入啊啊啊",
      tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符",
      regular: "^[^|':\\\\<>\"/?\\*]+$",
      required: true,
      tipsPlacement: 'top'
    }
  }, {
    model: "ipInputs",
    type: "ip-inputs",
    label: "IP输入框",
    hide: false,
    props: {
      simpleText: '单个',
      multiText: '区间',
      relatedUnique: "port",
      tips: "分为4段，每段范围为0~255的整数参考格式127.0.0.1",
      regular: "((([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])\\.){3}(([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])",
      required: true
    }
  }],

  // 表单校验数据
  checkComplexData: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
    props: {
      placeholder: "输入3~1000的数字",
      validators: [{
        "method": "isInt",
        "args": [{
          min: 3,
          max: 1000
        }],
        "message": "输入3~1000的数字"
      }]
    }
  }, {
    model: 'input2',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
    props: {
      placeholder: "xx",
      validators: [{
        "method": "isxx",
        "type": "dyFunction",
        "args": [],
        "message": "这个是我配置的function isxx，必须填入xx"
      }]
    }
  }],

  // 回填表单信息
  fillData: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
  }, {
    model: 'timePick',
    type: 'el-date-picker',
    label: "日期选择器",
    defaultValue: "",
    props: {
      type: "date",
      format: 'yyyy-MM-dd'
    }
  }],

  // 表单基础校验数据
  basicCheckData: [{
    model: 'input',
    type: "el-input",
    label: "输入框",
    defaultValue: "",
    props: {
      regular: "^[^|':\\\\<>\"/?\\*]+$",
      required: true,
      tips: "1-32个字符；不能包含'/\:*?<>|这些特殊字符"
    }
  }, {
    model: "ipInput",
    type: "h-ip-input",
    label: "IP输入框",
    defaultValue: '',
    props: {
      tips: "分为4段，每段范围为0~255的整数参考格式127.0.0.1",
      regular: "((([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])\\.){3}(([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])",
      required: true
    }
  }],

  // 表单校验数据
  simpleData: [{
    type: 'p',
    content: '这里的校验是开发人员自己加的',
    defaultValue: "",
  }, {
    model: 'input1',
    type: "el-input",
    label: "输入框",
    defaultValue: ""
  }, {
    model: 'input2',
    type: "el-input",
    label: "输入框",
    defaultValue: ""
  }],

  // 表单校验数据
  resetData: [{
    type: 'p',
    content: '重新设置了表单，这是其中一项',
    defaultValue: "",
  }, {
    model: 'input1',
    type: "el-input",
    label: "输入框1",
    defaultValue: ""
  }, {
    model: 'input2',
    type: "el-input",
    label: "输入框2",
    defaultValue: ""
  }]
}
