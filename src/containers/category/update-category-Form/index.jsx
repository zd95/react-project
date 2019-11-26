import React, { Component } from 'react'
import { Form, Input } from "antd";
import PropTypes from "prop-types";


@Form.create()
class UpdateCategoryForm extends Component {
  //定义当前组件标签属性的类型
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };

  //经过@Form.create()包装后的组件会继承Form.props.form属性，实现组件之间表单数据的双向传递
  //获取form属性中的 getFieldDecorator方法,来进行表单校验，
  //getFieldDecorator方法第一次调用时，
  //传入表单控件对应的id，{表单的校验规则}
  /* rule:表单的控件
    value:控件内接收的数据
    callback:回调函数
         callback直接调用，不传参数，表示验证通过，
         传参：错误原因 
         
         validator = (rule, value, callback) => {}
         */

  //设置表单数据的校验规则
  validator=(value,callback)=>{
    //如果用户输入的数据与当前分类中的数据相等，不更新数据
    if(value === this.props.categoryName){
      callback("哇偶~you can real dance")
    }else{
      callback()
    }
  }
  render() {
    const { form: { getFieldDecorator }, categoryName } = this.props

    return (
      <Form>
        <Form.Item label="品类名称">
          {
            getFieldDecorator(
              "categoryName",
              {
                rules: [
                  { required: true, message: "请输入分类名称" },
                  { validator: this.validator }
                ],
                //设置表单控件的初始值
                initialValue:categoryName
              }
            )(<Input placeholder="请输入分类名称"/>)
          }
        </Form.Item>
      </Form>
    )
  }
}
export default UpdateCategoryForm