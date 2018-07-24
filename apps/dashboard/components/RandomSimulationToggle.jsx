import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class ButtonExampleToggle extends Component {
  state = {}

  handleClick = () => this.setState({ active: !this.state.active })

  render() {
    const { active } = this.state

    const label = active? 'Online' : 'Offline';
    const extraProps = active? { positive: true } : { negative: true };
    return (
      <Button toggle active={active} {...extraProps} onClick={this.handleClick}>
        { label }
      </Button>
    )
  }
}

export default ButtonExampleToggle
