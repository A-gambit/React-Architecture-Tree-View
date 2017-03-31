import { INCREMENT, ADD_CHILD, REMOVE_CHILD, DELETE_NODE } from '../actions'
import { action } from 'mobx'
import { createFactory, mapOf, arrayOf } from 'mobx-state-tree'

const ChildId = createFactory(0)

const Node = createFactory({
  id: 0,
  counter: 0,
  childIds: arrayOf(ChildId)
})

let nextId = 0

const treeFactory = createFactory({
  tree: mapOf(Node),

  removeChild: function (nodeId, childId) {
    const node = this.tree.get(nodeId)
    node.childIds = node.childIds.filter(id => childId !== id)
  },

  deleteNode: function (nodeId) {
    this.tree.get(nodeId).childIds.forEach(childId => {
      this.deleteNode(childId)
      this.removeChild(nodeId, childId)
    })
    this.tree.delete(nodeId)
  },

  [INCREMENT]: action(function ({ nodeId }) {
    this.tree.get(nodeId).counter++
  }),

  [ADD_CHILD]: action(function ({ nodeId }) {
    const childId = `new_${nextId++}`
    this.tree.set(childId, Node({ id: childId }))
    this.tree.get(nodeId).childIds.push(childId)
  }),

  [REMOVE_CHILD]: action(function ({  nodeId, childId }) {
    this.removeChild(nodeId, childId)
  }),

  [DELETE_NODE]: action(function ({ nodeId }) {
    this.deleteNode(nodeId)
  })
})

export default treeFactory
