
//修改添加二合一组件

import React, { Component } from 'react'
import {
  Card, Icon, Input, Select, Button, InputNumber, Form, message
} from 'antd'
import { connect } from 'react-redux'
import { getCategoriesAsync } from '../../../redux/action-creators/category'
import { reqAddProduct, reqUpdateProduct ,reqGetProduct} from '../../../api'
// import Editor from './braftEditor';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

@Form.create()
@connect(state => ({ categories: state.categories }),{getCategoriesAsync})
class ProductForm extends Component {

  state = {
    // 创建一个空的editorState作为初始值{富文本编辑器}
    // editorState: BraftEditor.createEditorState(null)
    // 初始化为null，保证没有数据的时候
    // 不会进入BraftEditor.createEditorState(product.detail)初始化一个空P标签
    product: null
  }

  // 禁止表单默认行为
  addProduct = (e) => {
    e.preventDefault()
    // 如果用户输入的数据通过校验，收集当前表单中的数据
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        //提取数据当中需要的属性
        const { name, desc, price, categoryId, editorState } = values
        // 编辑器内容提交到服务端之前，调用editorState.toHTML()来获取HTML格式的内容
        //JSON.stringify会干掉用原型方法传输的数据，
        console.log(editorState);

        const detail = editorState.toHTML()

        let content = "";
        //判断当前操作是添加商品还是请求商品
        //获取当前组件的路径名，以及跳转至当前组件的路径时，location.state中是否携带数据
        const { pathname, state } = this.props.location
        if (pathname.startsWith('/product/update/')) {
          //如果用户到达当前组件的路径是'/product/update/'，说明需要修改商品
          //获取需要修改商品的id值
          const productId = state ? state._id : this.state.product._id 
         
          //提取用户所修改的数据的信息，将其发送至后台，更新数据
          await reqUpdateProduct({
            name,
            desc,
            price,
            categoryId,
            detail,
            productId
          })

          content = '更新'
        } else {
          //请求添加商品。将数据发送至后台
          await reqAddProduct({ name, desc, price, categoryId, detail })
          content = '添加'
        }

        message.success(`商品${content}成功~~`)
        //跳转至商品添加组件
        this.props.history.push('/product')
      }
    })
  }

  //从哪来，回哪去
  goBack = () => {
    this.props.history.goBack()
  }

  // 监听编辑器的变化
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  //设置编辑器数据的校验规则
  validator = (_rule, value, callback) => {
    if (!value || value.isEmpty()) {
      callback('请输入商品详情')
    } else {
      callback()
    }
  }
  componentDidMount() {
    //如果分类数据中的值为空，发送请求，请求数据
    if (!this.props.categories.length) {
      // 将响应数据{分类列表中的数据}添加至当前组件中的商品分类中
      this.props.getCategoriesAsync()
    }

    //如果state中没有商品数据，，发送请求，请求商品数据
    //请求所要修改的商品，将当前商品的id发送至后台，
    //将请求回来的商品数据渲染至当前组件对应的表单控件中
    if(!this.props.location.state){
      //发送请求
      reqGetProduct(this.props.match.params.id)
        .then((response)=>{
          //用当前组件的状态对象来接收响应的数据
          this.setState({
            product:response
          })
        })
    }
  }
  //经过@Form.create()包装后的组件会继承Form.props.form属性，实现组件之间表单数据的双向传递
  //获取form属性中的 getFieldDecorator方法,来进行表单校验，
  //getFieldDecorator方法第一次调用时，           第二次传入需要校验的组件
  //传入表单控件对应的id，{表单的校验规则}
  /* rule:表单的控件
    value:控件内接收的数据
    callback:回调函数
         callback直接调用，不传参数，表示验证通过，
         传参：错误原因 
         
         validator = (rule, value, callback) => {}
         */
  render() {
    const {
      categories,
      form: { getFieldDecorator },
      //提取从props.history中传递的数据,将数据添加至对应的容器中进行展示
      location: { state,pathname }
    } = this.props

      // 初始化为null保证添加商品时不会初始化数据
    // 更新商品product的值就不为空了
    let product = null;
    //判断是否需要修改数据
    let isUpdateProduct = false
    let dispose = '';
    //判断访问当前组件的路径，是添加还是修改
    if(pathname.startsWith('/product/update/')){
      isUpdateProduct=true
      // 处理当前商品
      product = state || this.state.product
    }
    
    dispose = isUpdateProduct ? "修改商品" : "添加商品"
    
    
    return (
      //设置当前组件的卡片容器
      <Card
        title={
          <div>
            <Icon type="arrow-left" onClick={this.goBack} />
            &nbsp;&nbsp;{dispose}
          </div>
        }
      >
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} onSubmit={this.addProduct}>
          <Form.Item label="商品名称">
            {
              getFieldDecorator(
                'name',
                {
                  rules: [{ required: true, message: "请输入商品名称" }],
                  initialValue: product ? product.name : ""
                }
              )(<Input placeholder="请输入商品名称" />)
            }

          </Form.Item>
          <Form.Item label="商品描述">
            {
              getFieldDecorator(
                'desc',
                {
                  rules: [{ required: true, message: "请输入商品描述" }],
                  initialValue: product ? product.desc : ""
                }
              )(<Input placeholder="请输入商品描述" />)
            }

          </Form.Item>
          <Form.Item label="商品分类">
            {
              getFieldDecorator(
                'categoryId',
                {
                  rules: [{ required: true, message: "请输入商品分类" }],
                  initialValue: product ? product.categoryId : ""
                }
              )(<Select placeholder="请输入商品分类">
                {
                  /*
                    遍历响应的商品分类数据，提取每一条分类数据的id值，
                    将其添加至对应的下拉项中
                  */
                }
                {
                  categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))
                }
              </Select>)
            }

          </Form.Item>

          <Form.Item label="商品价格">
            {
              getFieldDecorator(
                'price',
                {
                  rules: [{ required: true, message: "请输入商品价格" }],
                  initialValue: product ? product.price : ""
                }
              )(<InputNumber
                style={{ width: 170 }}
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                parser={value => value.replace(/￥\s?|(,*)/g, '')}//忽略当前警告
              // onChange={onChange}
              />)
            }

          </Form.Item>
          <Form.Item label="商品详情" wrapperCol={{ span: 22 }}><br />
            {
              getFieldDecorator(
                'editorState',
                {
                  //当编辑器失去焦点时，再对输入的数据进行表单校验
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    validator: this.validator
                  }],
                  initialValue: product
                    ? BraftEditor.createEditorState(product.detail)
                    : ""
                }
              )(<BraftEditor
                className="my-component"
                placeholder="请输入商品详情"
              // value={editorState}
              // onChange={this.handleEditorChange}
              // onSave={this.submitContent}
              />)
            }

            {/* <Editor /> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}


export default ProductForm