<template>
	<view class="uni-forms">
		<form @submit.stop="submitForm" @reset="resetForm">
			<slot></slot>
		</form>
	</view>
</template>

<script>
	/**
	 * Forms 表单
	 * @description 由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=2773
	 * @property {Object} formRules  							表单校验规则
	 * @property {String} trigger = [blur|change|submit]	校验触发器方式 默认 blur 可选
	 * 	@value blur 	失去焦点
	 * 	@value change 	发生变化时触发
	 * 	@value submit 	提交时触发
	 * @property {String} labelPosition = [top|left]				label 位置 默认 left 可选
	 * @value top		顶部显示 label
	 * @value left		左侧显示 label
	 * @property {String} labelWidth  							label 宽度，默认 65px
	 * @property {String} labelAlign = [left|center|right]		label 居中方式  默认 left 可选
	 * 	@value left		label 左侧显示
	 * 	@value center	label 居中
	 * 	@value right		label 右侧对齐
	 */
	import Vue from 'vue'
	Vue.prototype.uniFormsValidate = function(name, value, formName) {
	    if (formName) {
	        this.$refs[formName].setValue(name, value)
	    } else {
	        let refName = null
	        for(let  i in this.$refs){
	            refName= i
	            break
	        }
	        if(!refName) return console.error('当前 uni-froms 组件缺少 ref 属性')
	        this.$refs[refName].setValue(name, value)
	    }
	}
	import Validator from './validateFunction.js'

	export default {
		name: 'uniForms',
		props: {
			// 表单校验规则
			formRules: {
				type: Object,
				default () {
					return {}
				}
			},
			// 校验触发器方式，默认 关闭
			trigger: {
				type: String,
				default: ''
			},
			// label 位置，可选值 top/left
			labelPosition: {
				type: String,
				default: 'left'
			},
			// label 宽度，单位 px
			labelWidth: {
				type: [String, Number],
				default: 65
			},
			// label 居中方式，可选值 left/center/right
			labelAlign: {
				type: String,
				default: 'left'
			}
		},
		data() {
			return {
				formData: {}
			};
		},
		watch: {
			formRules(newVal) {
				this.init(newVal)
			},
			trigger(trigger) {
				this.formTrigger = trigger
			}
		},
		created() {
			let _this = this
			this.childrens = []
			this.rules = []
			this.init(this.formRules)

		},
		methods: {
			init(formRules) {
				if (Object.keys(formRules).length > 0) {
					this.formTrigger = this.trigger
					this.rules = formRules
					this.validator = new Validator(formRules)
					this.childrens.forEach((item)=>{
						item.init()
					})
				}
			},
			/**
			 * 设置校验规则
			 * @param {Object} formRules
			 */
			setRules(formRules){
				this.init(formRules)
			},
			/**
			 * 公开给用户使用
			 * 设置自定义表单组件 value 值
			 *  @param {String} name 字段名称
			 *  @param {String} value 字段值
			 */
			setValue(name, value, callback) {
				this.formData[name] = value
				let example = this.childrens.find(child => child.name === name)
				example.val = value
				return example.triggerCheck(value, callback)
			},

			/**
			 * TODO 表单提交， 小程序暂不支持这种用法
			 * @param {Object} event
			 */
			submitForm(event) {
				const value = event.detail.value
				return this.validateAll(value || this.formData, 'submit')
			},
			/**
			 * 表单重置
			 * @param {Object} event
			 */
			resetForm(event) {
				this.childrens.forEach(item => {
					item.errMsg = ''
					item.val = ''
					item.$emit('input', '')
				})
				this.$emit('reset', event)
			},

			/**
			 * 触发表单校验，通过 @validate 获取
			 * @param {Object} validate
			 */
			validateCheck(validate) {
				if (validate === null) validate = null
				this.$emit('validate', validate)
			},
			/**
			 * 校验所有或者部分表单
			 */
			validateAll(invalidFields, type, callback) {
				if (!this.validator) {
					this.$emit('submit', {
						detail: {
							value: invalidFields,
							errors: null
						}
					})
					return
				}
				this.childrens.forEach(item => {
					item.errMsg = ''
				})

				let promise;
				if (callback && typeof callback !== 'function' && Promise) {
					promise = new Promise((resolve, reject) => {
						callback = function(valid, invalidFields) {
							!valid ? resolve(invalidFields) : reject(valid);
						};
					});
				}
				let fieldsValue = {}
				for(let i in this.rules){
					for(let j in invalidFields){
						if(i === j){
							fieldsValue[i] = invalidFields[i]
						}
					}
				}
				let result = this.validator.invokeValidateUpdate( fieldsValue, true)

				if (Array.isArray(result)) {
					if (result.length === 0) result = null
				}
				let example = null
				result && result.forEach(item => {
					example = this.childrens.find(child => child.name === item.key)
					if (example) example.errMsg = item.errorMessage
				})

				if (type === 'submit') {
					this.$emit('submit', {
						detail: {
							value: invalidFields,
							errors: result
						}
					})
				} else {
					this.$emit('validate', result)
				}
				callback && typeof callback === 'function' && callback(result ? false : true, result ? result : invalidFields)
				if (promise && callback) return promise
			},

			/**
			 * 外部调用方法
			 * 手动提交校验表单
			 * 对整个表单进行校验的方法，参数为一个回调函数。
			 */
			submit() {
				return this.validateAll(this.formData, 'submit')
			},

			/**
			 * 外部调用方法
			 * 校验表单
			 * 对整个表单进行校验的方法，参数为一个回调函数。
			 */
			validate(callback) {
				return this.validateAll(this.formData, '', callback)
			},

			/**
			 * 部分表单校验
			 * @param {Object} props
			 * @param {Object} cb
			 */
			validateField(props, callback) {
				props = [].concat(props);
				let invalidFields = {}
				this.childrens.forEach(item => {
					// item.parentVal((val, name) => {
					if (props.indexOf(item.name) !== -1) {
						invalidFields = Object.assign({}, invalidFields, {
							[item.name]: this.formData[item.name]
						})
					}
					// })

				})
				return this.validateAll(invalidFields, '', callback)
			},

			/**
			 * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
			 */
			resetFields() {
				this.resetForm()
			},

			/**
			 * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
			 */
			clearValidate(props) {
				props = [].concat(props);
				this.childrens.forEach(item => {
					if (props.length === 0) {
						item.errMsg = ''
					} else {
						if (props.indexOf(item.name) !== -1) {
							item.errMsg = ''
						}
					}

				})
			}

		}
	}
</script>

<style lang="scss">
	.uni-forms {
		background-color: #fff;
	}
</style>
