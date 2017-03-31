import React from 'react'
import { Component } from 'react'
import { inject, observer } from 'mobx-react'

@observer
export class Node extends Component {
  handleIncrementClick() {
    const { increment } = this.props
    increment()
  }

  handleAddChildClick(e) {
    e.preventDefault()

    const { addChild, id } = this.props
    addChild(id)
  }

  handleRemoveClick(e) {
    e.preventDefault()

    const { removeChild, parentId, id } = this.props
    removeChild(id, parentId)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const { counter, parentId, childIds } = this.props
    return (
      <div>
        Counter: {counter}
        {' '}
        <button onClick={() => this.handleIncrementClick()}>
          +
        </button>
        {' '}
        {typeof parentId !== 'undefined' &&
        <a href="#" onClick={(e) => this.handleRemoveClick(e)}
           style={{ color: 'lightgray', textDecoration: 'none' }}>
          ×
        </a>
        }
        <ul>
          {childIds.map(this.renderChild)}
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

function mapStateToProps(state, ownProps) {
  const node = state.treeStore.tree[ownProps.id]
  return {
    ...node,
    increment: node.increment,
    addChild: state.treeStore.addChild,
    removeChild: state.treeStore.removeChild
  }
}

const ConnectedNode = inject(mapStateToProps)(Node)
export default ConnectedNode
