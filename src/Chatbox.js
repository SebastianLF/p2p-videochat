import React from 'react'
import Input from './Input.js'
import Logs from './Logs.js'

class Chatbox extends React.Component {
  constructor(props) {
    super(props)
    this.handleTyping = this.handleTyping.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.state = {
      logs: [],
      message: ''
    }
  }

  handleTyping(e) {
    this.setState({ message: e.target.value })
  }

  addMessage(e){
    e.preventDefault()
    this.setState({ logs: this.state.logs.concat(this.state.message), message: '' })
  }

  render() {
    return (
      <div>
        <Logs logs={this.state.logs}/>
        <Input value={this.state.message} handleTyping={this.handleTyping} addMessage={this.addMessage}/>
      </div>
    )
  }

}

export default Chatbox
