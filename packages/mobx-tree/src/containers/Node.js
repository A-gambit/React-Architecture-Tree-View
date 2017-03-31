import React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Node extends Component {
  handleIncrementClick() {
    const { node } = this.props
    node.increment()
  }

  handleAddChildClick(e) {
    e.preventDefault()

    const { node } = this.props
    node.addChild()
  }

  handleRemoveClick(e) {
    e.preventDefault()

    const { removeChild, node } = this.props
    removeChild(node.id)
  }

  renderChild = child => {
    const { node } = this.props
    return (
      <li key={child.id}>
        <Node node={child} removeChild={node.removeChild} />
      </li>
    )
  }

  render() {
    const { node, root } = this.props
    return (
      <div>
        Counter: {node.counter}
        {' '}
        <button onClick={() => this.handleIncrementClick()}>
          +
        </button>
        {' '}
        {!root &&
          <a href="#" onClick={(e) => this.handleRemoveClick(e)}
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {node.children.map(this.renderChild)}
          <li key="add">
            <a href="#" onClick={(e) => this.handleAddChildClick(e)}>
              Add child
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
