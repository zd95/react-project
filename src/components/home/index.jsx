import React, { Component } from 'react'
import withCheckLogin from '../../containers/with-check-login'



@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
          HOME组件的内容
      </div>
    )
  }
}
export default Home